import { writable } from 'svelte/store';

export const currentUser = writable({});

/**
 * @param {{}} user
 */
export function setCurrentUser(user) {
    currentUser.set(user);
} 
