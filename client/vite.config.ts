import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
 
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const port = parseInt(env.PORT);

	return {
		plugins: [sveltekit()],
		server: {
			port,
			strictPort: true
		}
	}
})
