import { NodeOperationError, type IDataObject, type IExecuteFunctions } from 'n8n-workflow';

import type { TubeAlfredRequestSpec } from './GenericFunctions';
import { OPERATIONS } from './generated/operations';

type ParameterValue = string | number | boolean | string[] | undefined;

interface ManifestParameter {
	name: string;
	field: string;
	in: 'path' | 'query' | 'body';
	required: boolean;
	schema: {
		type?: string;
		enum?: readonly string[];
		minimum?: number;
		maximum?: number;
		maxItems?: number;
	};
}

interface ManifestOperation {
	resource: string;
	operation: string;
	method: 'GET' | 'POST';
	path: string;
	parameters: readonly ManifestParameter[];
}

const manifestOperations = OPERATIONS as readonly ManifestOperation[];

export function getTubeAlfredRequest(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	if (resource === 'billing' && operation === 'getUsage') {
		return { method: 'GET', path: '/v1/billing/usage' };
	}

	const definition = manifestOperations.find(
		(candidate) => candidate.resource === resource && candidate.operation === operation,
	);

	if (!definition) {
		throw new NodeOperationError(
			this.getNode(),
			`Unsupported TubeAlfred operation: ${resource}.${operation}.`,
		);
	}

	let path = definition.path;
	const query: IDataObject = {};
	const body: IDataObject = {};

	for (const parameter of definition.parameters) {
		const value = parameterValue.call(this, parameter, itemIndex);

		if (parameter.in === 'path') {
			path = path.replace(`{${parameter.name}}`, encodeURIComponent(String(value)));
		} else if (parameter.in === 'query' && value !== undefined) {
			query[parameter.name] = value;
		} else if (parameter.in === 'body' && value !== undefined) {
			body[parameter.name] = value;
		}
	}

	return {
		method: definition.method,
		path,
		query: Object.keys(query).length === 0 ? undefined : query,
		body: Object.keys(body).length === 0 ? undefined : body,
	};
}

function parameterValue(
	this: IExecuteFunctions,
	parameter: ManifestParameter,
	itemIndex: number,
): ParameterValue {
	if (parameter.schema.type === 'array') {
		return requiredStringList.call(this, parameter, itemIndex);
	}

	if (parameter.schema.type === 'integer') {
		const value = this.getNodeParameter(parameter.field, itemIndex, undefined) as number | undefined;

		if (value === undefined && !parameter.required) {
			return undefined;
		}

		const minimum = parameter.schema.minimum ?? 1;
		const maximum = parameter.schema.maximum ?? Number.MAX_SAFE_INTEGER;
		if (!Number.isInteger(value) || (value as number) < minimum || (value as number) > maximum) {
			throw new NodeOperationError(
				this.getNode(),
				`${parameter.name} must be an integer from ${minimum} to ${maximum}.`,
				{ itemIndex },
			);
		}

		return value;
	}

	if (parameter.schema.type === 'boolean') {
		const value = this.getNodeParameter(parameter.field, itemIndex, false) as boolean;
		return value === true ? true : undefined;
	}

	const value = this.getNodeParameter(parameter.field, itemIndex, '') as string;
	const trimmed = value.trim();

	if (!trimmed) {
		if (parameter.required) {
			throw new NodeOperationError(this.getNode(), `${parameter.field} is required.`, { itemIndex });
		}
		return undefined;
	}

	if (parameter.schema.enum && !parameter.schema.enum.includes(trimmed)) {
		throw new NodeOperationError(
			this.getNode(),
			`${parameter.name} must be one of: ${parameter.schema.enum.join(', ')}.`,
			{ itemIndex },
		);
	}

	return trimmed;
}

function requiredStringList(
	this: IExecuteFunctions,
	parameter: ManifestParameter,
	itemIndex: number,
): string[] {
	const value = this.getNodeParameter(parameter.field, itemIndex, '') as string | string[];
	const values = Array.isArray(value) ? value : value.split(/[\n,]/u);
	const trimmed = values.map((item) => item.trim()).filter((item) => item.length > 0);
	const maximum = parameter.schema.maxItems ?? 50;

	if (trimmed.length === 0) {
		throw new NodeOperationError(this.getNode(), `${parameter.field} is required.`, { itemIndex });
	}
	if (trimmed.length > maximum) {
		throw new NodeOperationError(
			this.getNode(),
			`${parameter.name} must contain at most ${maximum} items.`,
			{ itemIndex },
		);
	}
	if (new Set(trimmed).size !== trimmed.length) {
		throw new NodeOperationError(this.getNode(), `${parameter.name} items must be unique.`, { itemIndex });
	}

	return trimmed;
}
