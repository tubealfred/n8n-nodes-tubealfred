import {
	NodeConnectionTypes,
	NodeOperationError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { normalizeResponse, tubeAlfredApiRequest } from './GenericFunctions';
import { tubeAlfredProperties } from './descriptions';
import { getTubeAlfredRequest } from './operations';

export class TubeAlfred implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TubeAlfred',
		name: 'tubeAlfred',
		icon: {
			light: 'file:../../icons/tubealfred.svg',
			dark: 'file:../../icons/tubealfred.dark.svg',
		},
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Fetch YouTube video, transcript, comment, channel, playlist, and search data from TubeAlfred',
		defaults: {
			name: 'TubeAlfred',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'tubeAlfredApi',
				required: true,
			},
		],
		properties: tubeAlfredProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const request = getTubeAlfredRequest.call(this, resource, operation, itemIndex);
				const response = await tubeAlfredApiRequest.call(this, request);
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(normalizeResponse(response)),
					{
						itemData: {
							item: itemIndex,
						},
					},
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : 'TubeAlfred request failed.',
						},
						pairedItem: {
							item: itemIndex,
						},
					});
					continue;
				}

				throw new NodeOperationError(
					this.getNode(),
					error instanceof Error ? error : new Error('TubeAlfred request failed.'),
					{ itemIndex },
				);
			}
		}

		return [returnData];
	}
}
