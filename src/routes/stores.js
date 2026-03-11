import { writable } from 'svelte/store';

export const currentUser = writable({});
export const currentAssets = writable([]);
export const currentNotifications = writable([]);

/**
 * @param {{}} user
 */
export function setCurrentUser(user) {
    currentUser.set(user);
} 

/**
 * @param {*} assets 
 */
export function setCurrentAssets(assets) {
    currentAssets.set(assets);
}   

/**
 * @param {*} notifications
 */
export function setCurrentNotifications(notifications) {
    currentNotifications.set(notifications);
}
