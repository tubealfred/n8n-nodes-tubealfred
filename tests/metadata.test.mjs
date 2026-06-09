import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const nodeSource = readFileSync(new URL('../nodes/TubeAlfred/TubeAlfred.node.ts', import.meta.url), 'utf8');
const descriptionsSource = readFileSync(new URL('../nodes/TubeAlfred/descriptions.ts', import.meta.url), 'utf8');
const operationsSource = readFileSync(new URL('../nodes/TubeAlfred/operations.ts', import.meta.url), 'utf8');

assert.equal(packageJson.name, 'n8n-nodes-tubealfred');
assert.ok(packageJson.keywords.includes('n8n-community-node-package'));
assert.deepEqual(packageJson.n8n.credentials, ['dist/credentials/TubeAlfredApi.credentials.js']);
assert.deepEqual(packageJson.n8n.nodes, ['dist/nodes/TubeAlfred/TubeAlfred.node.js']);
assert.match(nodeSource, /usableAsTool:\s*true/);

for (const operation of [
	'getTranscript',
	'getTranscriptFull',
	'getEnhanced',
	'getRelated',
	'getRelatedPage',
	'getMany',
	'getPage',
	'getCommunityPosts',
	'getCommunityPostsPage',
	'getPlaylists',
	'getPlaylistsPage',
	'getShorts',
	'getShortsPage',
	'getStreams',
	'getStreamsPage',
	'getVideos',
	'getVideosPage',
	'getSuggestions',
	'searchPage',
	'searchHashtag',
	'searchHashtagPage',
	'getMetadata',
	'getChannels',
	'resolve',
	'getUsage',
]) {
	assert.match(descriptionsSource, new RegExp(`value: '${operation}'`));
}

for (const path of [
	'/v1/youtube/video/${videoId}/enhanced',
	'/v1/youtube/video/${videoId}/transcript',
	'/v1/youtube/video/${videoId}/related',
	'/v1/youtube/video/${videoId}/related/page',
	'/v1/youtube/channel/${channelId}/${pageFeedPaths[operation]}/page',
	'/v1/youtube/search/page',
	'/v1/youtube/search/hashtag/page',
	'/v1/youtube/playlist/${playlistId}/metadata',
	'/v1/youtube/playlist/${playlistId}/page',
	'/v1/youtube/videos:batch',
	'/v1/youtube/channels:batch',
	'/v1/youtube/trending',
	'/v1/youtube/trending/shorts',
	'/v1/billing/usage',
]) {
	assert.ok(operationsSource.includes(path), `Expected operations.ts to contain ${path}`);
}

assert.match(descriptionsSource, /maxValue:\s*100/);
