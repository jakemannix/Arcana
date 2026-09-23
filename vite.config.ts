import { defineConfig } from 'vite';

// Relative asset paths let the same build run at a site root or under a subfolder, such as GitHub Pages.
export default defineConfig({ base: './' });
