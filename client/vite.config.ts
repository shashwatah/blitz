import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: { // took this from reddit, use dotenv later
		host: "localhost",
		port: 4000,
		strictPort: true
	}
});
