export function notify(message) {
    console.log('[Notification]', message);
    if (Notification.permission === 'granted') {
        new Notification('Deriv Bot', { body: message });
    }
}

export function logTrade(trade) {
    console.log('[Trade Log]', trade);
}
