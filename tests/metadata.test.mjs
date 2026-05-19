import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const nodeSource = readFileSync(new URL('../nodes/TubeAlfred/TubeAlfred.node.ts', import.meta.url), 'utf8');
const descriptionsSource = readFileSync(new URL('../nodes/TubeAlfred/descriptions.ts', import.meta.url), 'utf8');

assert.equal(packageJson.name, 'n8n-nodes-tubealfred');
assert.ok(packageJson.keywords.includes('n8n-community-node-package'));
assert.deepEqual(packageJson.n8n.credentials, ['dist/credentials/TubeAlfredApi.credentials.js']);
assert.deepEqual(packageJson.n8n.nodes, ['dist/nodes/TubeAlfred/TubeAlfred.node.js']);
assert.match(nodeSource, /usableAsTool:\s*true/);

for (const operation of [
	'getTranscript',
	'getMany',
	'getPage',
	'getCommunityPosts',
	'getPlaylists',
	'getShorts',
	'getVideos',
	'getSuggestions',
	'searchHashtag',
	'resolve',
]) {
	assert.match(descriptionsSource, new RegExp(`value: '${operation}'`));
}
