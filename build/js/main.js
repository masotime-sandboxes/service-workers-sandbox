console.log('main.js loaded');

function preliminaries() {
	return Promise.resolve().then(() => {
		Notification.requestPermission();

		if (Notification.permission === 'denied') {
			throw new Error('User has blocked notifications');
		} else {
			console.log('🔵 User has granted permissions');
		}

		if (!('PushManager' in window)) {
			throw new Error('Push messaging isn\'t supported');
		} else {
			console.log('🔵 Browser has support for push messaging');
		}
	});
}

function subscribe(reg) {
	return reg.pushManager.subscribe({
		userVisibleOnly: true
	}).then(sub => {
		const { endpoint } = sub;
		const key = sub.getKey('p256dh');
		console.log(`🔵 ${JSON.stringify({key, endpoint}, null, 4)}`);
	})
}

function main() {
	if ('serviceWorker' in navigator) {
		console.log('🔵 Service Worker supported by browser');

		return navigator.serviceWorker.register('/js/sw.js')
			.then(subscribe);

	} else {
		throw new Error('Service Workers not supported by browser');
	}
}

preliminaries()
	.then(main)
	.catch(err => {
		console.error(`🔴 ${err.message || err}`);
		console.error(err);
	});