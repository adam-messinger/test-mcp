# Test MCP Server

A simple stateless MCP server deployable to Vercel using Streamable HTTP transport.

## Features

- `hello_world` tool - Returns a greeting message with optional name parameter
- `farm_summary` tool - Fetches farm parameters from Halter API including grazing targets, growth forecasts, and irrigation coverage

## Environment Variables

Set the following environment variable in Vercel:

- `HALTER_AUTH_TOKEN` - Your Halter API authentication token

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Set the `HALTER_AUTH_TOKEN` environment variable in your Vercel project settings
2. Deploy:

```bash
vercel
```

## Connect to MCP Client

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "test-mcp": {
      "url": "https://your-deployment.vercel.app/mcp"
    }
  }
}
```

## Testing

Call the hello_world tool:

```bash
curl -X POST https://your-deployment.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"hello_world","arguments":{"name":"Alice"}},"id":1}'

curl -X POST https://your-deployment.vercel.app/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"farm_summary","arguments":{}},"id":1}'
```
