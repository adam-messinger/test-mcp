import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'hello_world',
      'Returns a simple hello world message',
      {
        name: z.string().optional().describe('Optional name to greet')
      },
      async ({ name }) => {
        const greetName = name || 'World';
        return {
          content: [{ type: 'text', text: `Hello, ${greetName}!` }],
        };
      },
    );
  },
  {},
  { basePath: '/api' },
);

export { handler as GET, handler as POST, handler as DELETE };
