import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

const API_BASE_URL = 'https://api.tubealfred.com';
const PACKAGE_VERSION = '0.1.0';

export type TubeAlfredMethod = 'GET' | 'POST';

export interface TubeAlfredRequestSpec {
	method: TubeAlfredMethod;
	path: string;
	query?: IDataObject;
	body?: IDataObject;
}

export async function tubeAlfredApiRequest(
	this: IExecuteFunctions,
	spec: TubeAlfredRequestSpec,
): Promise<unknown> {
	const options: IHttpRequestOptions = {
		method: spec.method,
		url: `${API_BASE_URL}${spec.path}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'User-Agent': `n8n-nodes-tubealfred/${PACKAGE_VERSION}`,
		},
		json: true,
	};

	if (spec.query !== undefined) {
		options.qs = spec.query;
	}

	if (spec.body !== undefined) {
		options.body = spec.body;
	}

	return await this.helpers.httpRequestWithAuthentication.call(this, 'tubeAlfredApi', options);
}

export function compactRecord(record: IDataObject): IDataObject {
	return Object.fromEntries(
		Object.entries(record).filter(([, value]) => value !== undefined && value !== ''),
	);
}

export function normalizeResponse(response: unknown): IDataObject[] {
	if (Array.isArray(response)) {
		return response.map((item) => normalizeItem(item));
	}

	return [normalizeItem(response)];
}

function normalizeItem(item: unknown): IDataObject {
	if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
		return item as IDataObject;
	}

	return {
		data: item as IDataObject[keyof IDataObject],
	};
}
