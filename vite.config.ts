import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import {defineConfig, loadEnv} from 'vite';
import { handleContactRequest } from './api/contact-handler';

function readRequestBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function sendWebResponse(webResponse: Response, res: ServerResponse): Promise<void> {
  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const arrayBuffer = await webResponse.arrayBuffer();
  res.end(Buffer.from(arrayBuffer));
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const contactEnv = { ...process.env, ...env };

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'contact-api-dev',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const method = req.method ?? 'GET';
            const url = req.url ? new URL(req.url, 'http://localhost:3000') : null;

            if (!url || url.pathname !== '/api/contact') {
              next();
              return;
            }

            if (method === 'OPTIONS') {
              res.statusCode = 204;
              res.end();
              return;
            }

            const body =
              method === 'GET' || method === 'HEAD'
                ? undefined
                : await readRequestBody(req);

            const request = new Request(url.toString(), {
              method,
              headers: req.headers as Record<string, string>,
              body,
            });

            const response = await handleContactRequest(request, contactEnv);
            await sendWebResponse(response, res);
          });
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/strapi': {
          target: 'https://jubilant-basketball-030ed19cd1.strapiapp.com',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/strapi/, ''),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('gsap') || id.includes('motion')) return 'vendor-animation';
            if (id.includes('lucide-react')) return 'vendor-icons';
            return 'vendor';
          },
        },
      },
    },
  };
});
