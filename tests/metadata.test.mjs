import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function readJson(path) {
	return JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
}

const packageJson = readJson('../package.json');
const contract = readJson('../contracts/tubealfred-youtube-operations.v1.json');
const nodeSource = readFileSync(new URL('../nodes/TubeAlfred/TubeAlfred.node.ts', import.meta.url), 'utf8');
const descriptionsSource = readFileSync(new URL('../nodes/TubeAlfred/descriptions.ts', import.meta.url), 'utf8');
const operationsSource = readFileSync(new URL('../nodes/TubeAlfred/operations.ts', import.meta.url), 'utf8');
const generatedSource = readFileSync(new URL('../nodes/TubeAlfred/generated/operations.ts', import.meta.url), 'utf8');
const genericFunctionsSource = readFileSync(new URL('../nodes/TubeAlfred/GenericFunctions.ts', import.meta.url), 'utf8');

assert.equal(packageJson.name, 'n8n-nodes-tubealfred');
assert.ok(packageJson.keywords.includes('n8n-community-node-package'));
assert.deepEqual(packageJson.n8n.credentials, ['dist/credentials/TubeAlfredApi.credentials.js']);
assert.deepEqual(packageJson.n8n.nodes, ['dist/nodes/TubeAlfred/TubeAlfred.node.js']);
assert.match(nodeSource, /usableAsTool:\s*true/);
assert.equal(contract.manifest_version, '1.1.0');
assert.equal(contract.operation_count, 35);

for (const operation of contract.operations) {
	assert.ok(generatedSource.includes(`"id": "${operation.id}"`));
	assert.ok(generatedSource.includes(`"resource": "${operation.clients.n8n.resource}"`));
	assert.ok(generatedSource.includes(`"operation": "${operation.clients.n8n.operation}"`));
	assert.ok(generatedSource.includes(`"path": "${operation.path}"`));
}

assert.match(descriptionsSource, /\.\.\.generatedOperationProperties/);
assert.match(operationsSource, /manifestOperations\.find/);
assert.match(operationsSource, /\/v1\/billing\/usage/);
assert.match(generatedSource, /"maximum": 100/);
assert.match(descriptionsSource, /maxValue:\s*100/);
assert.match(genericFunctionsSource, /timeout:\s*35_000/);
