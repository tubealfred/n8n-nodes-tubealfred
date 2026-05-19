import { NodeOperationError, type IExecuteFunctions } from 'n8n-workflow';

import { compactRecord, type TubeAlfredRequestSpec } from './GenericFunctions';

export function getTubeAlfredRequest(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	if (resource === 'video') {
		return videoRequest.call(this, operation, itemIndex);
	}

	if (resource === 'comment') {
		return commentRequest.call(this, operation, itemIndex);
	}

	if (resource === 'reply') {
		return replyRequest.call(this, operation, itemIndex);
	}

	if (resource === 'channel') {
		return channelRequest.call(this, operation, itemIndex);
	}

	if (resource === 'search') {
		return searchRequest.call(this, operation, itemIndex);
	}

	if (resource === 'playlist') {
		return playlistRequest.call(this, operation, itemIndex);
	}

	if (resource === 'url') {
		return {
			method: 'GET',
			path: '/v1/youtube/utility/resolve',
			query: {
				url: requiredString.call(this, 'url', itemIndex),
			},
		};
	}

	throw unsupported.call(this, resource, operation);
}

function videoRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	const videoId = pathValue.call(this, 'videoId', itemIndex);

	if (operation === 'get') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}`,
		};
	}

	if (operation === 'getTranscript') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/transcript/fast`,
		};
	}

	throw unsupported.call(this, 'video', operation);
}

function commentRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	const videoId = pathValue.call(this, 'videoId', itemIndex);
	const count = optionalCount.call(this, itemIndex);

	if (operation === 'getMany') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/comments`,
			query: compactRecord({
				count,
			}),
		};
	}

	if (operation === 'getPage') {
		return {
			method: 'POST',
			path: `/v1/youtube/video/${videoId}/comments/page`,
			body: compactRecord({
				continuation_token: requiredString.call(this, 'pageCursor', itemIndex),
				count,
			}),
		};
	}

	throw unsupported.call(this, 'comment', operation);
}

function replyRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	const videoId = pathValue.call(this, 'videoId', itemIndex);
	const commentId = pathValue.call(this, 'commentId', itemIndex);
	const count = optionalCount.call(this, itemIndex);

	if (operation === 'getMany') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/comments/${commentId}/replies`,
			query: compactRecord({
				count,
			}),
		};
	}

	if (operation === 'getPage') {
		return {
			method: 'POST',
			path: `/v1/youtube/video/${videoId}/comments/${commentId}/replies/page`,
			body: compactRecord({
				continuation_token: requiredString.call(this, 'pageCursor', itemIndex),
				count,
			}),
		};
	}

	throw unsupported.call(this, 'reply', operation);
}

function channelRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	const channelId = pathValue.call(this, 'channelId', itemIndex);

	const feedPaths: Record<string, string> = {
		getCommunityPosts: 'community',
		getPlaylists: 'playlists',
		getShorts: 'shorts',
		getVideos: 'videos',
	};

	if (operation === 'get') {
		return {
			method: 'GET',
			path: `/v1/youtube/channel/${channelId}`,
		};
	}

	if (operation === 'getAbout') {
		return {
			method: 'GET',
			path: `/v1/youtube/channel/${channelId}/about`,
		};
	}

	if (operation in feedPaths) {
		return {
			method: 'GET',
			path: `/v1/youtube/channel/${channelId}/${feedPaths[operation]}`,
			query: compactRecord({
				continuation_token: optionalString.call(this, 'pageCursor', itemIndex),
			}),
		};
	}

	throw unsupported.call(this, 'channel', operation);
}

function searchRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	if (operation === 'search') {
		return {
			method: 'GET',
			path: '/v1/youtube/search/',
			query: compactRecord({
				query: requiredString.call(this, 'query', itemIndex),
				continuation_token: optionalString.call(this, 'pageCursor', itemIndex),
			}),
		};
	}

	if (operation === 'searchHashtag') {
		return {
			method: 'GET',
			path: '/v1/youtube/search/hashtag',
			query: compactRecord({
				hashtag: requiredString.call(this, 'hashtag', itemIndex),
				continuation_token: optionalString.call(this, 'pageCursor', itemIndex),
			}),
		};
	}

	if (operation === 'getSuggestions') {
		return {
			method: 'GET',
			path: '/v1/youtube/search/suggestions',
			query: compactRecord({
				q: requiredString.call(this, 'suggestionQuery', itemIndex),
				prev: optionalString.call(this, 'previousQuery', itemIndex),
			}),
		};
	}

	throw unsupported.call(this, 'search', operation);
}

function playlistRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	if (operation === 'get') {
		return {
			method: 'GET',
			path: `/v1/youtube/playlist/${pathValue.call(this, 'playlistId', itemIndex)}`,
			query: compactRecord({
				continuation_token: optionalString.call(this, 'pageCursor', itemIndex),
			}),
		};
	}

	throw unsupported.call(this, 'playlist', operation);
}

function pathValue(this: IExecuteFunctions, name: string, itemIndex: number): string {
	return encodeURIComponent(requiredString.call(this, name, itemIndex));
}

function requiredString(this: IExecuteFunctions, name: string, itemIndex: number): string {
	const value = this.getNodeParameter(name, itemIndex, '') as string;
	const trimmed = value.trim();

	if (!trimmed) {
		throw new NodeOperationError(this.getNode(), `${name} is required.`, { itemIndex });
	}

	return trimmed;
}

function optionalString(this: IExecuteFunctions, name: string, itemIndex: number): string | undefined {
	const value = this.getNodeParameter(name, itemIndex, '') as string;
	const trimmed = value.trim();

	return trimmed || undefined;
}

function optionalCount(this: IExecuteFunctions, itemIndex: number): number | undefined {
	const value = this.getNodeParameter('count', itemIndex, undefined) as number | undefined;

	if (value === undefined) {
		return undefined;
	}

	if (!Number.isInteger(value) || value < 1 || value > 500) {
		throw new NodeOperationError(this.getNode(), 'count must be an integer from 1 to 500.', {
			itemIndex,
		});
	}

	return value;
}

function unsupported(this: IExecuteFunctions, resource: string, operation: string): NodeOperationError {
	return new NodeOperationError(
		this.getNode(),
		`Unsupported TubeAlfred operation: ${resource}.${operation}.`,
	);
}
