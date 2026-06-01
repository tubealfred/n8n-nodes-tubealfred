import type { INodeProperties } from 'n8n-workflow';

const commentPaginationOperations = ['getPage'];
const replyPaginationOperations = ['getPage'];
const optionalPaginationResources = ['channel', 'search', 'playlist'];

export const tubeAlfredProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
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
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['video'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get video details',
				action: 'Get video details',
			},
			{
				name: 'Get Transcript',
				value: 'getTranscript',
				description: 'Get video transcript',
				action: 'Get video transcript',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['comment'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get first comments page',
				action: 'Get many comments',
			},
			{
				name: 'Get Page',
				value: 'getPage',
				description: 'Get comments page from a continuation token',
				action: 'Get comments page',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['reply'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				description: 'Get first replies page',
				action: 'Get many replies',
			},
			{
				name: 'Get Page',
				value: 'getPage',
				description: 'Get replies page from a continuation token',
				action: 'Get replies page',
			},
		],
		default: 'getMany',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['channel'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get channel details',
				action: 'Get channel details',
			},
			{
				name: 'Get About',
				value: 'getAbout',
				description: 'Get channel about section',
				action: 'Get channel about section',
			},
			{
				name: 'Get Community Posts',
				value: 'getCommunityPosts',
				description: 'Get channel community posts',
				action: 'Get channel community posts',
			},
			{
				name: 'Get Playlists',
				value: 'getPlaylists',
				description: 'Get channel playlists',
				action: 'Get channel playlists',
			},
			{
				name: 'Get Shorts',
				value: 'getShorts',
				description: 'Get channel Shorts',
					action: 'Get channel shorts',
			},
			{
				name: 'Get Videos',
				value: 'getVideos',
				description: 'Get channel videos',
				action: 'Get channel videos',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
		options: [
			{
				name: 'Get Suggestions',
				value: 'getSuggestions',
				description: 'Get YouTube search autocomplete suggestions',
				action: 'Get search suggestions',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search YouTube',
					action: 'Search youtube',
			},
			{
				name: 'Search Hashtag',
				value: 'searchHashtag',
				description: 'Search YouTube by hashtag',
					action: 'Search youtube hashtag',
			},
		],
		default: 'search',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['playlist'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get playlist contents',
				action: 'Get playlist contents',
			},
		],
		default: 'get',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['url'],
			},
		},
		options: [
			{
				name: 'Resolve',
				value: 'resolve',
				description: 'Resolve a YouTube URL to canonical identifiers',
					action: 'Resolve youtube url',
			},
		],
		default: 'resolve',
	},
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
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['comment', 'reply'],
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
				resource: optionalPaginationResources,
				operation: [
					'getCommunityPosts',
					'getPlaylists',
					'getShorts',
					'getVideos',
					'get',
					'search',
					'searchHashtag',
				],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['search'],
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
				operation: ['searchHashtag'],
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
