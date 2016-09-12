import { Router } from 'express';
import Webscrape from 'webscrape';
import bodyParser from 'body-parser';

export function routes() {
	const router = Router();
	const scraper = Webscrape();
	const { API_KEY } = process.env;

	router.use(bodyParser.json());
	router.post('/send', async (req, res) => {
		const { message, registrationId } = req.body;

		console.log(`Attempting to send ${message}`);
		try {
			await scraper.post('https://android.googleapis.com/gcm/send', {
				headers: {
					'content-type': 'application/json',
					'Authorization': `key=${API_KEY}`
				},
				body: {
					registration_ids: [ registrationId ]
				}
			});

			res.json({ success: true });			
		} catch (err) {
			res.json({
				success: false,
				error: JSON.stringify(err),
				stack: err && err.stack
			});
		}

	});
}