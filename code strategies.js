const activeLoops = [];

export function startStrategyLoop(account, assets, strategy) {
    assets.forEach(asset => {
        const loop = setInterval(() => {
            // Replace this with real strategy logic
            console.log(`[Strategy] ${strategy} checking ${asset} for account balance ${account.balance}`);
            // Example: signal to open a trade
        }, 5000); // check every 5 seconds
        activeLoops.push(loop);
    });
}

export function stopAllStrategies() {
    activeLoops.forEach(loop => clearInterval(loop));
    activeLoops.length = 0;
    console.log('[Strategy] All strategies stopped');
}
