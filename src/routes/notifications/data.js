export const notifications = [
    { id: 1, message: 'Your AAPL stock has reached your target price.', read: false },
    { id: 2, message: 'New article available: Market trends for Q2.', read: true },
    { id: 3, message: 'Your portfolio summary is ready.', read: false },
  ];
  
export function getUnreadNotifications() {
    return notifications.filter(notification => !notification.read);
}