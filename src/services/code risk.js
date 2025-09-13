export function calculateLotSize(balance, riskPercent) {
    const riskAmount = balance * (riskPercent / 100);
    const lot = Math.max(0.01, riskAmount / 100); // example calculation
    return parseFloat(lot.toFixed(2));
}

export function stopLoss(price, pips) {
    return price - pips; // simplistic example
}

export function takeProfit(price, pips) {
    return price + pips; // simplistic example
}
