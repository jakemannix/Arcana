import { defineConfig } from 'vite';

// A standalone Node bundle of scripts/arcana-cli.ts for tool services; it
// inlines the translator and the verified grimoire key. `npm run build:cli`.
export default defineConfig({
  publicDir: false,
  build: { ssr: 'scripts/arcana-cli.ts', outDir: 'dist-cli', emptyOutDir: true },
});
