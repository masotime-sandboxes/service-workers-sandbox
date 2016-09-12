import Promise from 'bluebird';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

export function listen(app, port) {
	return new Promise((ok, fail) => {
		app.listen(port, err => {
			if (err) {
				return fail(err);
			}
			return ok(app);
		});
	});
}

export function webpackMiddleware({compiler: compilerConfig, middleware: middlwareConfig}) {
	const compiler = webpack(compilerConfig);
	return webpackDevMiddleware(compiler, middlwareConfig);
}
