export const generateFullAnalysisPrompt = (stockInfo, marketData) => `
You are a stock market AI analyst specializing in concise, actionable insights. Provide a focused analysis for ${
  stockInfo.symbol
} using this exact format:

--- START ANALYSIS FORMAT ---

**Current Status**: ${stockInfo.price} (${stockInfo.changePercent})

1. 🔍 **Key Metrics**
- Sector/Industry: ${stockInfo.sector}/${stockInfo.industry}
- P/E: ${stockInfo.peRatio}
- RSI: ${Object.values(stockInfo.rsi)[0] || "N/A"} (${getRSIInterpretation(
  Object.values(stockInfo.rsi)[0]
)})
- SMA: ${Object.values(stockInfo.sma)[0] || "N/A"} vs Price

2. 📉 **Fibonacci Levels** (Based on recent high/low)
- 23.6%: [calculate from recent high/low]
- 38.2%: [calculate from recent high/low]
- 50%: [calculate from recent high/low]
- 61.8%: [calculate from recent high/low]

3. 🧠 **AI Recommendation**
[Buy/Hold/Sell] - [1-2 sentence rationale]

4. ⚠️ **Key Risk**
[Most significant current risk]

5. 📝 **Quick Tip**
[One actionable tip for investors]

--- END FORMAT ---

INSTRUCTIONS:
- Calculate Fibonacci levels using the highest and lowest prices from the last 30 days of daily data
- Keep each section extremely concise (1-2 lines max)
- Focus on actionable insights rather than lengthy explanations
- For RSI interpretation:
  - <30 = Oversold
  - 30-70 = Neutral 
  - >70 = Overbought
`;

export const generateBasicAnalysisPrompt = (stockData) => `
Provide a concise analysis of ${stockData.name} (${stockData.symbol}) using this format:

--- START ANALYSIS FORMAT ---

**Current Status**: ${stockData.price || "N/A"}

1. 🔍 **Snapshot**
- Sector: ${stockData.sector}
- P/E: ${stockData.peRatio}
- Market Cap: ${stockData.marketCap}

2. 🧠 **Recommendation**
[Buy/Hold/Sell] - [Brief rationale]

3. ⚠️ **Watch Out For**
[Top risk factor]

4. 📝 **Quick Tip**
[One useful tip]

--- END FORMAT ---

Keep entire analysis under 150 words. Focus on what matters most to investors.
`;

export const generateFallbackPrompt = (stockData) => `
Provide a 3-sentence analysis of ${stockData.name} (${stockData.symbol}):

1. Current status: [Price/trend]
2. Recommendation: [Buy/Hold/Sell] 
3. Key consideration: [Main factor]
`;

// Helper functions
function getRSIInterpretation(rsiValue) {
  if (!rsiValue) return "N/A";
  const num = parseFloat(rsiValue);
  if (num < 30) return "Oversold";
  if (num > 70) return "Overbought";
  return "Neutral";
}

export const selectPrompt = (stockData, isModelOverloaded = false) => {
  return isModelOverloaded
    ? generateFallbackPrompt(stockData)
    : generateBasicAnalysisPrompt(stockData);
};
