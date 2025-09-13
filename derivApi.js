let ws;

export function initDerivApi({ token, onBalance, onTrade }) {
    ws = new WebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=1089&l=${token}`);
    
    ws.onopen = () => console.log('[Deriv API] Connected');

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        // Example: balance update
        if (data.balance) onBalance(data.balance);
        // Example: new trade update
        if (data.proposal_open_contract) onTrade(data.proposal_open_contract);
    };

    ws.onclose = () => console.log('[Deriv API] Connection closed');
    ws.onerror = (err) => console.error('[Deriv API] Error', err);
}

export function subscribeToBalance() {
    if (!ws) return;
    ws.send(JSON.stringify({ balance: 1 }));
}

export function subscribeToTrades() {
    if (!ws) return;
    ws.send(JSON.stringify({ proposal_open_contract: 1 }));
}
