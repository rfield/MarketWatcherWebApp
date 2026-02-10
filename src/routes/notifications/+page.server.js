import { getUnreadNotifications } from './data.js';

export function load() {
	return {
		notifications: getUnreadNotifications()
	};
}