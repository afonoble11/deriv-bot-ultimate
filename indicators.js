// utils/indicators.js
// Technical indicators for trading strategies

// Exponential Moving Average
export function EMA(prices, period) {
    const k = 2 / (period + 1);
    let emaArray = [];
    prices.forEach((price, index) => {
        if (index === 0) {
            emaArray.push(price); // first value is just price
        } else {
            emaArray.push(price * k + emaArray[index - 1] * (1 - k));
        }
    });
    return emaArray;
}

// Relative Strength Index
export function RSI(prices, period = 14) {
    if (prices.length < period + 1) return [];

    let gains = [];
    let losses = [];

    for (let i = 1; i <= period; i++) {
        const diff = prices[i] - prices[i - 1];
        gains.push(Math.max(diff, 0));
        losses.push(Math.max(-diff, 0));
    }

    let avgGain = gains.reduce((a, b) => a + b, 0) / period;
    let avgLoss = losses.reduce((a, b) => a + b, 0) / period;

    let rsiArray = [];
    let rs = avgGain / avgLoss;
    rsiArray[period] = 100 - 100 / (1 + rs);

    for (let i = period + 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        const gain = Math.max(diff, 0);
        const loss = Math.max(-diff, 0);

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;

        rs = avgGain / avgLoss;
        rsiArray.push(100 - 100 / (1 + rs));
    }

    return rsiArray;
}

// Moving Average Convergence Divergence
export function MACD(prices, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
    const emaShort = EMA(prices, shortPeriod);
    const emaLong = EMA(prices, longPeriod);

    const macdLine = emaShort.map((val, idx) => val - (emaLong[idx] || 0));
    const signalLine = EMA(macdLine.slice(longPeriod - 1), signalPeriod);

    const histogram = macdLine.slice(longPeriod - 1).map((val, idx) => val - signalLine[idx]);

    return {
        macdLine: macdLine.slice(longPeriod - 1),
        signalLine,
        histogram
    };
}
