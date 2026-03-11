import { refreshNotifications } from '../utils.js';

export const actions = {
    default: async ({ request }) => {

        console.log('Inside default action handler for notifications page server load');
        const formData = await request.formData();
        const userName = formData.get('userName');
        console.log('Received form data for user name:', userName);
        let uname = '';
        try {
			uname = JSON.parse(userName);
			console.log('Parsed user name from form data:', uname);
		} catch (error) {
			console.error('Error parsing user name from form:', error);
			return { success: false, error: 'Invalid user name format.' };
		}
        const updatedNotificationList = await refreshNotifications(uname);
        console.log('...Updated notifications for user:', updatedNotificationList);
        

        return { success: true, notifications: updatedNotificationList };
    }
}
