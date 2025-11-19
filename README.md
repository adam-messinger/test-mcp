# Test MCP Server

A simple stateless MCP server deployable to Vercel using Streamable HTTP transport.

## Features

- `hello_world` tool - Returns a greeting message with optional name parameter

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
vercel
```

## Connect to MCP Client

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "test-mcp": {
      "url": "https://your-deployment.vercel.app/api/mcp"
    }
  }
}
```

## Testing

Call the hello_world tool:

```bash
curl -X POST https://your-deployment.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"hello_world","arguments":{"name":"Alice"}},"id":1}'
```
