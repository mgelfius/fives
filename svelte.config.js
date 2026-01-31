import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

const config = {
	kit: {
		adapter: adapter(),
		appDir: 'app',
		pages: 'build',
		paths: {
            base: dev ? '' : '/fives',
        }
	}
};

export default config;
