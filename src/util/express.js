import Promise from 'bluebird';

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