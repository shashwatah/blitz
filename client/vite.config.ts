import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
 
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const port = parseInt(env.PORT || "4000");

	return {
		plugins: [sveltekit()],
		server: { // took this from reddit, use dotenv later
			host: "localhost",
			port,
			strictPort: true
		}
	}
})
