import { NodeOperationError, type IDataObject, type IExecuteFunctions } from 'n8n-workflow';

import { compactRecord, type TubeAlfredRequestSpec } from './GenericFunctions';

export function getTubeAlfredRequest(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	if (resource === 'billing') {
		return billingRequest.call(this, operation);
	}

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

	if (resource === 'batch') {
		return batchRequest.call(this, operation, itemIndex);
	}

	if (resource === 'trend') {
		return trendRequest.call(this, operation);
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

function billingRequest(this: IExecuteFunctions, operation: string): TubeAlfredRequestSpec {
	if (operation === 'getUsage') {
		return {
			method: 'GET',
			path: '/v1/billing/usage',
		};
	}

	throw unsupported.call(this, 'billing', operation);
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
			query: compactRecord({
				fields: optionalString.call(this, 'fields', itemIndex),
			}),
		};
	}

	if (operation === 'getEnhanced') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/enhanced`,
			query: compactRecord({
				fields: optionalString.call(this, 'fields', itemIndex),
			}),
		};
	}

	if (operation === 'getTranscript') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/transcript/fast`,
			query: compactRecord({
				language: optionalString.call(this, 'transcriptLanguage', itemIndex),
				kind: optionalString.call(this, 'transcriptKind', itemIndex),
			}),
		};
	}

	if (operation === 'getTranscriptFull') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/transcript`,
			query: compactRecord({
				language: optionalString.call(this, 'transcriptLanguage', itemIndex),
				kind: optionalString.call(this, 'transcriptKind', itemIndex),
			}),
		};
	}

	if (operation === 'getRelated') {
		return {
			method: 'GET',
			path: `/v1/youtube/video/${videoId}/related`,
			query: compactRecord({
				continuation_token: optionalString.call(this, 'pageCursor', itemIndex),
			}),
		};
	}

	if (operation === 'getRelatedPage') {
		return {
			method: 'POST',
			path: `/v1/youtube/video/${videoId}/related/page`,
			body: {
				continuation_token: requiredString.call(this, 'pageCursor', itemIndex),
			},
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
				sort: optionalString.call(this, 'commentSort', itemIndex),
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
				sort: optionalString.call(this, 'commentSort', itemIndex),
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
		getStreams: 'streams',
		getVideos: 'videos',
	};
	const pageFeedPaths: Record<string, string> = {
		getCommunityPostsPage: 'community',
		getPlaylistsPage: 'playlists',
		getShortsPage: 'shorts',
		getStreamsPage: 'streams',
		getVideosPage: 'videos',
	};

	if (operation === 'get') {
		return {
			method: 'GET',
			path: `/v1/youtube/channel/${channelId}`,
			query: compactRecord({
				fields: optionalString.call(this, 'fields', itemIndex),
			}),
		};
	}

	if (operation === 'getAbout') {
		return {
			method: 'GET',
			path: `/v1/youtube/channel/${channelId}/about`,
			query: compactRecord({
				fields: optionalString.call(this, 'fields', itemIndex),
			}),
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

	if (operation in pageFeedPaths) {
		return {
			method: 'POST',
			path: `/v1/youtube/channel/${channelId}/${pageFeedPaths[operation]}/page`,
			body: {
				continuation_token: requiredString.call(this, 'pageCursor', itemIndex),
			},
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
			query: searchParameters.call(this, itemIndex, optionalString.call(this, 'pageCursor', itemIndex)),
		};
	}

	if (operation === 'searchPage') {
		return {
			method: 'POST',
			path: '/v1/youtube/search/page',
			body: searchParameters.call(this, itemIndex, requiredString.call(this, 'pageCursor', itemIndex)),
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

	if (operation === 'searchHashtagPage') {
		return {
			method: 'POST',
			path: '/v1/youtube/search/hashtag/page',
			body: {
				hashtag: requiredString.call(this, 'hashtag', itemIndex),
				continuation_token: requiredString.call(this, 'pageCursor', itemIndex),
			},
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
	const playlistId = pathValue.call(this, 'playlistId', itemIndex);

	if (operation === 'get') {
		return {
			method: 'GET',
			path: `/v1/youtube/playlist/${playlistId}`,
			query: compactRecord({
				continuation_token: optionalString.call(this, 'pageCursor', itemIndex),
			}),
		};
	}

	if (operation === 'getMetadata') {
		return {
			method: 'GET',
			path: `/v1/youtube/playlist/${playlistId}/metadata`,
		};
	}

	if (operation === 'getPage') {
		return {
			method: 'POST',
			path: `/v1/youtube/playlist/${playlistId}/page`,
			body: {
				continuation_token: requiredString.call(this, 'pageCursor', itemIndex),
			},
		};
	}

	throw unsupported.call(this, 'playlist', operation);
}

function batchRequest(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): TubeAlfredRequestSpec {
	const pathByOperation: Record<string, string> = {
		getChannels: '/v1/youtube/channels:batch',
		getVideos: '/v1/youtube/videos:batch',
	};

	if (operation in pathByOperation) {
		return {
			method: 'POST',
			path: pathByOperation[operation],
			query: compactRecord({
				fields: optionalString.call(this, 'fields', itemIndex),
			}),
			body: {
				ids: requiredStringList.call(this, 'ids', itemIndex),
			},
		};
	}

	throw unsupported.call(this, 'batch', operation);
}

function trendRequest(this: IExecuteFunctions, operation: string): TubeAlfredRequestSpec {
	const pathByOperation: Record<string, string> = {
		getShorts: '/v1/youtube/trending/shorts',
		getVideos: '/v1/youtube/trending',
	};

	if (operation in pathByOperation) {
		return {
			method: 'GET',
			path: pathByOperation[operation],
		};
	}

	throw unsupported.call(this, 'trend', operation);
}

function searchParameters(
	this: IExecuteFunctions,
	itemIndex: number,
	continuationToken: string | undefined,
): IDataObject {
	return compactRecord({
		query: requiredString.call(this, 'query', itemIndex),
		channel_id: optionalString.call(this, 'searchChannelId', itemIndex),
		upload_date: optionalString.call(this, 'uploadDate', itemIndex),
		duration: optionalString.call(this, 'duration', itemIndex),
		sort: optionalString.call(this, 'sort', itemIndex),
		type: optionalString.call(this, 'resultType', itemIndex),
		features: optionalString.call(this, 'features', itemIndex),
		live: optionalBoolean.call(this, 'live', itemIndex),
		shorts: optionalBoolean.call(this, 'shorts', itemIndex),
		continuation_token: continuationToken,
	});
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

function requiredStringList(this: IExecuteFunctions, name: string, itemIndex: number): string[] {
	const value = this.getNodeParameter(name, itemIndex, '') as string | string[];
	const values = Array.isArray(value) ? value : value.split(/[\n,]/u);
	const trimmed = values.map((item) => item.trim()).filter((item) => item.length > 0);

	if (trimmed.length === 0) {
		throw new NodeOperationError(this.getNode(), `${name} is required.`, { itemIndex });
	}

	return trimmed;
}

function optionalString(this: IExecuteFunctions, name: string, itemIndex: number): string | undefined {
	const value = this.getNodeParameter(name, itemIndex, '') as string;
	const trimmed = value.trim();

	return trimmed || undefined;
}

function optionalBoolean(this: IExecuteFunctions, name: string, itemIndex: number): boolean | undefined {
	const value = this.getNodeParameter(name, itemIndex, false) as boolean;

	return value === true ? true : undefined;
}

function optionalCount(this: IExecuteFunctions, itemIndex: number): number | undefined {
	const value = this.getNodeParameter('count', itemIndex, undefined) as number | undefined;

	if (value === undefined) {
		return undefined;
	}

	if (!Number.isInteger(value) || value < 1 || value > 100) {
		throw new NodeOperationError(this.getNode(), 'count must be an integer from 1 to 100.', {
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
