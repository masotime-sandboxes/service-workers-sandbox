console.log('main.js loaded');

function preliminaries() {
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

	if (!('serviceWorker' in navigator)) {
		throw new Error('Service Workers not supported by browser');
	} else {
		console.log('🔵 Browser has support for service workers');
	}
}

async function subscribe(reg) {
	const sub = await reg.pushManager.subscribe({ userVisibleOnly: true });
	const { endpoint } = sub;
	const key = sub.getKey('p256dh');
	console.log(`🔵 ${JSON.stringify({key, endpoint}, null, 4)}`);
	return endpoint;
}

export default async function main() {
	try {
		preliminaries();
		const reg = await navigator.serviceWorker.register('/js/sw.js');
		return subscribe(reg);
	} catch (err) {
		console.error(`🔴 ${err.message || err}`);
		console.error(err);		
	}
}