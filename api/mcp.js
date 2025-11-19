import { z } from 'zod';
import { createMcpHandler } from 'mcp-handler';

const HALTER_API_URL = 'https://api.prod.halter.io/pasture/farm-parameters';
const HALTER_AUTH_TOKEN = process.env.HALTER_AUTH_TOKEN;

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

    server.tool(
      'farm_summary',
      'Fetches farm parameters from Halter API including grazing targets, growth forecasts, and irrigation coverage',
      {},
      async () => {
        try {
          const response = await fetch(HALTER_API_URL, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${HALTER_AUTH_TOKEN}`,
              'context-override': '{}',
            },
          });

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const data = await response.json();

          // Format the response in a readable way
          const summary = `
**Farm Parameters Summary**

🌱 **Grazing Targets:**
- Pre-grazing: ${data.preGrazingTargetInKgDmHa} kg DM/ha
- Post-grazing: ${data.postGrazingTargetInKgDmHa} kg DM/ha

📊 **Growth Information:**
- Forecast Origin: ${data.growthForecastOrigin}
- Growth Rate Origin: ${data.growthRateOrigin}

💧 **Irrigation:**
- Coverage: ${data.irrigationCoverage}

📅 **Metadata:**
- Version: ${data.version}
- Last Updated: ${new Date(data.updatedDate).toLocaleString()}
- Recurring Supplements: ${data.recurringSupplements ? 'Yes' : 'No'}
          `.trim();

          return {
            content: [{ type: 'text', text: summary }],
          };
        } catch (error) {
          return {
            content: [{
              type: 'text',
              text: `Error fetching farm summary: ${error.message}`
            }],
            isError: true,
          };
        }
      },
    );
  },
  {},
  { basePath: '' },
);

export { handler as GET, handler as POST, handler as DELETE };
