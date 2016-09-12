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

function main() {
	if ('serviceWorker' in navigator) {
		console.log('🔵 Service Worker supported by browser');

		return navigator.serviceWorker.register('/js/sw.js')
			.then(reg => {
				console.log('🔵', reg);	

				if (!reg.showNotification) {
					throw new Error('Notifications are not supported by Service workers');
				}

				return reg.pushManager.subscribe({
					userVisibleOnly: true
				});
			}).then(sub => {
				console.log(`endpoint: ${sub.endpoint}`);
			});

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