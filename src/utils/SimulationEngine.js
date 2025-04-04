// simulationEngine.js

/**
 * Simulates VFV price over time with a crash and recovery.
 * Then applies investment strategies to calculate portfolio performance.
 */

export function simulateInvestment({
  strategy,
  marketScenario,
  timeHorizon,
  startingPrice,
  config,
}) {
  const months = timeHorizon * 12;
  const {
    crashPercent,
    crashDurationMonths,
    recoveryType,
    growthRate,
    crashShape = "linear",
  } = marketScenario;

  const prices = generatePriceTimeline(
    startingPrice,
    months,
    crashPercent,
    crashDurationMonths,
    recoveryType,
    growthRate ?? 0.07,
    timeHorizon,
    crashShape
  );
  const result = applyStrategy(strategy, prices, config);
  return result;
}

function generatePriceTimeline(
  start,
  months,
  crashPercent,
  crashDuration,
  recoveryType,
  growthRate,
  timeHorizon,
  crashShape
) {
  const prices = [];
  const crashEnd = crashDuration;
  const bottomPrice = start * (1 - crashPercent / 100);
  const recoveryMonths = months - crashDuration;
  const recoveryYears = recoveryMonths / 12;
  const growthTarget = bottomPrice * Math.pow(1 + growthRate, recoveryYears);

  for (let i = 0; i < months; i++) {
    let price;

    if (i < crashEnd) {
      if (crashShape === "volatile") {
        const volatility = (Math.random() - 0.5) * 0.1;
        const t = i / crashEnd;
        const smoothDrop = start - (start - bottomPrice) * t;
        price = smoothDrop * (1 + volatility);
      } else {
        price = start - (start - bottomPrice) * (i / crashEnd);
      }
    } else {
      const t = (i - crashEnd) / recoveryMonths;
      switch (recoveryType) {
        case "flat":
          price = bottomPrice;
          break;
        case "gradual":
          price = bottomPrice + (growthTarget - bottomPrice) * t;
          break;
        default:
          price = bottomPrice;
      }
    }

    prices.push(price);
  }

  return prices;
}

function applyStrategy(strategy, prices, config) {
  const timeline = [];
  let cash = config.initialCash;
  let shares = 0;
  let invested = 0;
  let values = [];
  let week = 0;

  for (let month = 0; month < prices.length; month++) {
    const price = prices[month];
    let investAmount = 0;

    if (strategy === "lumpSum" && month === 0) {
      investAmount = config.initialCash;
      cash -= investAmount;
      invested += investAmount;
      shares += investAmount / price;
    } else if (strategy === "dca") {
      const frequency = config.dcaFrequency ?? 1;
      for (let i = 0; i < 4; i++) {
        if (week % frequency === 0 && cash > 0) {
          const amt = Math.min(config.weeklyDca, cash);
          cash -= amt;
          invested += amt;
          shares += amt / price;
        }
        week++;
      }
    } else if (strategy === "adaptiveDca") {
      for (let i = 0; i < 4; i++) {
        const dropPct = ((price - prices[0]) / prices[0]) * 100;
        let amt = config.weeklyDca;
        if (dropPct <= -10 && config.drop10) amt *= config.drop10;
        if (dropPct <= -20 && config.drop20) amt *= config.drop20;
        if (dropPct <= -30 && config.drop30) amt *= config.drop30;
        amt = Math.min(amt, cash);
        cash -= amt;
        invested += amt;
        shares += amt / price;
        week++;
      }
    } else if (strategy === "exponentialDca") {
      for (let i = 0; i < 4; i++) {
        const dropPct = ((price - prices[0]) / prices[0]) * 100;
        let amt = 0;
        if (dropPct <= -30 && config.drop30)
          amt = config.initialCash * (config.drop30 / 100);
        else if (dropPct <= -20 && config.drop20)
          amt = config.initialCash * (config.drop20 / 100);
        else if (dropPct <= -10 && config.drop10)
          amt = config.initialCash * (config.drop10 / 100);
        else amt = config.weeklyDca;
        amt = Math.min(amt, cash);
        cash -= amt;
        invested += amt;
        shares += amt / price;
        week++;
      }
    } else if (strategy === "cashOnly") {
      const monthlyDecay = config.cashDecayRate ? config.cashDecayRate / 12 : 0;
      cash *= 1 - monthlyDecay;
    }

    const portfolioValue = shares * price + cash;
    timeline.push({ month, price, shares, cash, portfolioValue, invested });
    values.push(portfolioValue);
  }

  const finalValue = timeline[timeline.length - 1].portfolioValue;
  const avgCost = shares > 0 ? invested / shares : 0;
  const irr = estimateIRR(values, invested);
  const maxDrawdown = calculateMaxDrawdown(values);

  return {
    timeline,
    summary: {
      finalValue,
      totalShares: shares,
      avgCost,
      irr,
      maxDrawdown,
    },
  };
}

function estimateIRR(values, invested) {
  const n = values.length;
  const fv = values[n - 1];
  const r = Math.pow(fv / invested, 1 / n) - 1;
  return r;
}

function calculateMaxDrawdown(values) {
  let peak = values[0];
  let maxDd = 0;
  for (let v of values) {
    if (v > peak) peak = v;
    const dd = (peak - v) / peak;
    if (dd > maxDd) maxDd = dd;
  }
  return maxDd;
}
