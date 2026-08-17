import type { INodeProperties } from 'n8n-workflow';

import { OPERATIONS } from './generated/operations';

const commentPaginationOperations = ['getPage'];
const replyPaginationOperations = ['getPage'];
const transcriptOperations = ['getTranscript', 'getTranscriptFull'];
const videoOptionalPaginationOperations = ['getRelated'];
const videoRequiredPaginationOperations = ['getRelatedPage'];
const channelOptionalPaginationOperations = [
	'getCommunityPosts',
	'getPlaylists',
	'getShorts',
	'getStreams',
	'getVideos',
];
const channelRequiredPaginationOperations = [
	'getCommunityPostsPage',
	'getPlaylistsPage',
	'getShortsPage',
	'getStreamsPage',
	'getVideosPage',
];
const searchOptionalPaginationOperations = ['search', 'searchHashtag'];
const searchRequiredPaginationOperations = ['searchPage', 'searchHashtagPage'];

const operationDefaults: Record<string, string> = {
	batch: 'getVideos',
	billing: 'getUsage',
	channel: 'get',
	comment: 'getMany',
	playlist: 'get',
	reply: 'getMany',
	search: 'search',
	trend: 'getVideos',
	url: 'resolve',
	video: 'get',
};
const generatedOperationProperties: INodeProperties[] = [
	{
		resource: 'billing',
		operation: 'getUsage',
		name: 'Get Usage',
		description: 'Get credit balance and billing usage',
	},
	...OPERATIONS,
].reduce<INodeProperties[]>((properties, definition) => {
	const resource = 'resource' in definition ? definition.resource : '';
	const operation = 'operation' in definition ? definition.operation : '';
	const description = definition.description;
	const existing = properties.find(
		(property) => property.displayOptions?.show?.resource?.[0] === resource,
	);
	const option = {
		name: definition.name,
		value: operation,
		description,
		action: description,
	};

	if (existing && Array.isArray(existing.options)) {
		existing.options.push(option);
		return properties;
	}

	properties.push({
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		default: '',
		noDataExpression: true,
		displayOptions: { show: { resource: [resource] } },
		options: [option],
	});
	return properties;
}, []);

for (const property of generatedOperationProperties) {
	const resource = property.displayOptions?.show?.resource?.[0];
	property.default = typeof resource === 'string' ? (operationDefaults[resource] ?? '') : '';
}

export const tubeAlfredProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Batch',
				value: 'batch',
			},
			{
				name: 'Billing',
				value: 'billing',
			},
			{
				name: 'Channel',
				value: 'channel',
			},
			{
				name: 'Comment',
				value: 'comment',
			},
			{
				name: 'Playlist',
				value: 'playlist',
			},
			{
				name: 'Reply',
				value: 'reply',
			},
			{
				name: 'Search',
				value: 'search',
			},
			{
				name: 'Trend',
				value: 'trend',
			},
			{
				name: 'URL',
				value: 'url',
			},
			{
				name: 'Video',
				value: 'video',
			},
		],
		default: 'video',
	},
	...generatedOperationProperties,
	{
		displayName: 'Video ID',
		name: 'videoId',
		type: 'string',
		required: true,
		default: '',
		description: 'YouTube video ID',
		displayOptions: {
			show: {
				resource: ['video', 'comment', 'reply'],
			},
		},
	},
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'string',
		required: true,
		default: '',
		description: 'Top-level YouTube comment ID returned by the comments endpoint',
		displayOptions: {
			show: {
				resource: ['reply'],
			},
		},
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		default: 20,
		description: 'Number of items to fetch per page',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['comment', 'reply'],
			},
		},
	},
	{
		displayName: 'Comment Sort',
		name: 'commentSort',
		type: 'options',
		default: '',
		description: 'Comment sort order',
		options: [
			{ name: 'Default (Top)', value: '' },
			{ name: 'Newest', value: 'newest' },
			{ name: 'Top', value: 'top' },
		],
		displayOptions: {
			show: {
				resource: ['comment', 'reply'],
				operation: ['getMany'],
			},
		},
	},
	{
		displayName: 'Transcript Language',
		name: 'transcriptLanguage',
		type: 'string',
		default: '',
		placeholder: 'en',
		description: 'Preferred caption language code, for example en, es, or en-US',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: transcriptOperations,
			},
		},
	},
	{
		displayName: 'Transcript Kind',
		name: 'transcriptKind',
		type: 'options',
		default: '',
		description: 'Caption track kind preference',
		options: [
			{ name: 'Any', value: '' },
			{ name: 'Auto', value: 'auto' },
			{ name: 'Manual', value: 'manual' },
		],
		displayOptions: {
			show: {
				resource: ['video'],
				operation: transcriptOperations,
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		default: '',
		placeholder: 'ID,title,view_count',
		description: 'Comma-separated response fields to include',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: ['get', 'getEnhanced'],
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		default: '',
		placeholder: 'ID,title,subscriber_count',
		description: 'Comma-separated response fields to include',
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: ['get', 'getAbout'],
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		default: '',
		placeholder: 'ID,title',
		description: 'Comma-separated response fields to include',
		displayOptions: {
			show: {
				resource: ['batch'],
				operation: ['getChannels', 'getVideos'],
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		required: true,
		default: '',
		description: 'Pagination cursor returned by the previous response',
		displayOptions: {
			show: {
				resource: ['comment'],
				operation: commentPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		required: true,
		default: '',
		description: 'Pagination cursor returned by the previous response',
		displayOptions: {
			show: {
				resource: ['reply'],
				operation: replyPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		required: true,
		default: '',
		description: 'Pagination cursor returned by the previous response',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: videoRequiredPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		required: true,
		default: '',
		description: 'Pagination cursor returned by the previous response',
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: channelRequiredPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		required: true,
		default: '',
		description: 'Pagination cursor returned by the previous response',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: searchRequiredPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		required: true,
		default: '',
		description: 'Pagination cursor returned by the previous response',
		displayOptions: {
			show: {
				resource: ['playlist'],
				operation: ['getPage'],
			},
		},
	},
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'string',
		required: true,
		default: '',
		description: 'YouTube UC channel ID, @handle, or username',
		displayOptions: {
			show: {
				resource: ['channel'],
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		default: '',
		description: 'Optional pagination cursor from a previous TubeAlfred response',
		displayOptions: {
			show: {
				resource: ['video'],
				operation: videoOptionalPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		default: '',
		description: 'Optional pagination cursor from a previous TubeAlfred response',
		displayOptions: {
			show: {
				resource: ['channel'],
				operation: channelOptionalPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		default: '',
		description: 'Optional pagination cursor from a previous TubeAlfred response',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: searchOptionalPaginationOperations,
			},
		},
	},
	{
		displayName: 'Page Cursor',
		name: 'pageCursor',
		type: 'string',
		default: '',
		description: 'Optional pagination cursor from a previous TubeAlfred response',
		displayOptions: {
			show: {
				resource: ['playlist'],
				operation: ['get'],
			},
		},
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		description: 'YouTube search query',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Channel ID',
		name: 'searchChannelId',
		type: 'string',
		default: '',
		description: 'Restrict search results to a single channel ID, handle, or username',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Upload Date',
		name: 'uploadDate',
		type: 'options',
		default: '',
		description: 'Filter results by upload date',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Any', value: '' },
			{ name: 'This Month', value: 'month' },
			{ name: 'This Week', value: 'week' },
			{ name: 'This Year', value: 'year' },
			{ name: 'Today', value: 'today' },
		],
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Duration',
		name: 'duration',
		type: 'options',
		default: '',
		description: 'Filter results by video duration',
		options: [
			{ name: '3 to 20 Minutes', value: 'three_to_twenty_mins' },
			{ name: 'All', value: 'all' },
			{ name: 'Any', value: '' },
			{ name: 'Over 20 Minutes', value: 'over_twenty_mins' },
			{ name: 'Under 3 Minutes', value: 'under_three_mins' },
		],
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Sort By',
		name: 'sort',
		type: 'options',
		default: '',
		description: 'Search ranking preference',
		options: [
			{ name: 'Default (Relevance)', value: '' },
			{ name: 'Relevance', value: 'relevance' },
			{ name: 'Popularity', value: 'popularity' },
		],
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Result Type',
		name: 'resultType',
		type: 'options',
		default: '',
		description: 'Restrict the type of results returned',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Any', value: '' },
			{ name: 'Channel', value: 'channel' },
			{ name: 'Movie', value: 'movie' },
			{ name: 'Playlist', value: 'playlist' },
			{ name: 'Shorts', value: 'shorts' },
			{ name: 'Video', value: 'video' },
		],
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Features',
		name: 'features',
		type: 'string',
		default: '',
		placeholder: 'hd,subtitles',
		description:
			'Comma-separated feature filters: hd, subtitles, creative_commons, 3d, live, purchased, 4k, 360, location, hdr, vr180',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Live Only',
		name: 'live',
		type: 'boolean',
		default: false,
		description: 'Whether to only return live streams (shortcut for features=live)',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Shorts Only',
		name: 'shorts',
		type: 'boolean',
		default: false,
		description: 'Whether to only return Shorts (shortcut for type=shorts)',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['search', 'searchPage'],
			},
		},
	},
	{
		displayName: 'Hashtag',
		name: 'hashtag',
		type: 'string',
		required: true,
		default: '',
		description: 'YouTube hashtag, with or without the # prefix',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['searchHashtag', 'searchHashtagPage'],
			},
		},
	},
	{
		displayName: 'Partial Query',
		name: 'suggestionQuery',
		type: 'string',
		required: true,
		default: '',
		description: 'Partial search query to autocomplete',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['getSuggestions'],
			},
		},
	},
	{
		displayName: 'Previous Query',
		name: 'previousQuery',
		type: 'string',
		default: '',
		description: 'Optional previous query context',
		displayOptions: {
			show: {
				resource: ['search'],
				operation: ['getSuggestions'],
			},
		},
	},
	{
		displayName: 'Playlist ID',
		name: 'playlistId',
		type: 'string',
		required: true,
		default: '',
		description: 'YouTube playlist ID',
		displayOptions: {
			show: {
				resource: ['playlist'],
			},
		},
	},
	{
		displayName: 'IDs',
		name: 'ids',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'dQw4w9WgXcQ,9bZkp7q19f0',
		description: 'Comma-separated or newline-separated YouTube IDs',
		displayOptions: {
			show: {
				resource: ['batch'],
				operation: ['getChannels', 'getVideos'],
			},
		},
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'Full YouTube URL to resolve',
		displayOptions: {
			show: {
				resource: ['url'],
			},
		},
	},
];
