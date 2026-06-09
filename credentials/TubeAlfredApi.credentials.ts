import type {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TubeAlfredApi implements ICredentialType {
	name = 'tubeAlfredApi';

	displayName = 'TubeAlfred API';

	icon = 'file:../icons/tubealfred.svg' as const;

	documentationUrl = 'https://github.com/tubealfred/n8n-nodes-tubealfred#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'TubeAlfred API key. Use youtube.read for YouTube operations and billing.read for billing usage.',
		},
	];

	authenticate = {
		type: 'generic' as const,
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: 'https://api.tubealfred.com',
			url: '/v1/youtube/utility/resolve',
			qs: {
				url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			},
		},
	};
}
