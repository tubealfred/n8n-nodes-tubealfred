import type { INodeProperties } from 'n8n-workflow';

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
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['billing'],
			},
		},
		options: [
			{
				name: 'Get Usage',
				value: 'getUsage',
				description: 'Get credit balance and billing usage',
				action: 'Get billing usage',
			},
		],
		default: 'getUsage',
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
				name: 'Get Enhanced',
				value: 'getEnhanced',
				description: 'Get enhanced video details',
				action: 'Get enhanced video details',
			},
			{
				name: 'Get Related',
				value: 'getRelated',
				description: 'Get related videos',
				action: 'Get related videos',
			},
			{
				name: 'Get Related Page',
				value: 'getRelatedPage',
				description: 'Get related videos page from a continuation token',
				action: 'Get related videos page',
			},
			{
				name: 'Get Transcript',
				value: 'getTranscript',
				description: 'Get video transcript',
				action: 'Get video transcript',
			},
			{
				name: 'Get Transcript Full',
				value: 'getTranscriptFull',
				description: 'Get full video transcript',
				action: 'Get full video transcript',
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
				name: 'Get Community Posts Page',
				value: 'getCommunityPostsPage',
				description: 'Get channel community posts page from a continuation token',
				action: 'Get channel community posts page',
			},
			{
				name: 'Get Playlists',
				value: 'getPlaylists',
				description: 'Get channel playlists',
				action: 'Get channel playlists',
			},
			{
				name: 'Get Playlists Page',
				value: 'getPlaylistsPage',
				description: 'Get channel playlists page from a continuation token',
				action: 'Get channel playlists page',
			},
			{
				name: 'Get Shorts',
				value: 'getShorts',
				description: 'Get channel Shorts',
				action: 'Get channel shorts',
			},
			{
				name: 'Get Shorts Page',
				value: 'getShortsPage',
				description: 'Get channel Shorts page from a continuation token',
				action: 'Get channel shorts page',
			},
			{
				name: 'Get Streams',
				value: 'getStreams',
				description: 'Get channel streams',
				action: 'Get channel streams',
			},
			{
				name: 'Get Streams Page',
				value: 'getStreamsPage',
				description: 'Get channel streams page from a continuation token',
				action: 'Get channel streams page',
			},
			{
				name: 'Get Videos',
				value: 'getVideos',
				description: 'Get channel videos',
				action: 'Get channel videos',
			},
			{
				name: 'Get Videos Page',
				value: 'getVideosPage',
				description: 'Get channel videos page from a continuation token',
				action: 'Get channel videos page',
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
			{
				name: 'Search Hashtag Page',
				value: 'searchHashtagPage',
				description: 'Search YouTube hashtag page from a continuation token',
				action: 'Search youtube hashtag page',
			},
			{
				name: 'Search Page',
				value: 'searchPage',
				description: 'Search YouTube page from a continuation token',
				action: 'Search youtube page',
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
			{
				name: 'Get Metadata',
				value: 'getMetadata',
				description: 'Get playlist metadata',
				action: 'Get playlist metadata',
			},
			{
				name: 'Get Page',
				value: 'getPage',
				description: 'Get playlist page from a continuation token',
				action: 'Get playlist page',
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
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['batch'],
			},
		},
		options: [
			{
				name: 'Get Channels',
				value: 'getChannels',
				description: 'Get details for multiple channels',
				action: 'Get channels batch',
			},
			{
				name: 'Get Videos',
				value: 'getVideos',
				description: 'Get details for multiple videos',
				action: 'Get videos batch',
			},
		],
		default: 'getVideos',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['trend'],
			},
		},
		options: [
			{
				name: 'Get Shorts',
				value: 'getShorts',
				description: 'Get trending Shorts',
				action: 'Get trending shorts',
			},
			{
				name: 'Get Videos',
				value: 'getVideos',
				description: 'Get trending videos',
				action: 'Get trending videos',
			},
		],
		default: 'getVideos',
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
