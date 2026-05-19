# n8n-nodes-tubealfred

Community node for using the TubeAlfred YouTube API inside n8n workflows and AI Agent tools.

## Requirements

- n8n with community nodes enabled.
- A TubeAlfred account.
- A TubeAlfred API key with the `youtube.read` scope.

Create an API key in TubeAlfred:

```text
https://tubealfred.com/app/api-keys
```

Choose **Create key**, select the `youtube.read` scope, then copy the key immediately. TubeAlfred only shows the full key once.

## Install

In n8n:

1. Open **Settings**.
2. Open **Community Nodes**.
3. Choose **Install**.
4. Enter:

```text
n8n-nodes-tubealfred
```

Self-hosted installs can also install from npm:

```bash
npm install n8n-nodes-tubealfred
```

## Credentials

Create a **TubeAlfred API** credential in n8n and paste the API key from `https://tubealfred.com/app/api-keys`.

The credential stores the key as a password field and sends it as:

```http
Authorization: Bearer YOUR_TUBEALFRED_API_KEY
```

## Operations

The TubeAlfred node supports:

- Video: get details, get transcript.
- Comment: get first page, get paginated page.
- Reply: get first page, get paginated page.
- Channel: get details, about, videos, Shorts, playlists, community posts.
- Search: search query, hashtag search, autocomplete suggestions.
- Playlist: get playlist contents.
- URL: resolve YouTube URLs to canonical identifiers.

The node is marked `usableAsTool`, so n8n AI Agent workflows can call it as a tool after credentials are configured.

## Example

Fetch a transcript for a YouTube video:

1. Add a **Manual Trigger** node.
2. Add **TubeAlfred**.
3. Select **Resource**: `Video`.
4. Select **Operation**: `Get Transcript`.
5. Enter a YouTube **Video ID**.
6. Execute the workflow.

## Development

```bash
npm install
npm run lint
npm run build
npm test
```

For local n8n testing:

```bash
npm run dev
```

## Publishing

n8n community nodes are npm packages. This package includes a GitHub Actions publish workflow that uses npm provenance, which n8n requires for verified node submissions after May 1, 2026.
