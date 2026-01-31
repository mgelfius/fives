import adapter from '@sveltejs/adapter-auto';

const dev = process.argv.includes('dev');

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
		}),
		appDir: 'app',
		paths: {
            base: dev ? '' : '/fives',
        }
	}
};

export default config;
