// simulates and calculates worst case scenarion of how many times you need to press "craft" in-game

export function craftingSimulationWorstCase(craftingAmount, returnRateDecimal, res1AmountTotal, res1Amount, res2AmountTotal, res2Amount) {
  if (craftingAmount <= 1) return [];
  let productionOutput = 1 / (1 - returnRateDecimal);
  let x = Math.ceil(res1AmountTotal / productionOutput);
  let y = Math.ceil(res2AmountTotal / productionOutput);
  let xr = x; // res 1 required
  let yr = y; // res 2 required
  let cat = Math.floor(x / res1Amount); // crafting amount temporary
  let csum = 0;
  let pressCount = 0; // craft button press counter

  while (x >= res1Amount && y >= res2Amount) {
    pressCount++;
    if (cat >= 40) {
      while (cat >= 40) {
        csum += 40;
        x -= Math.floor(res1Amount * 40 * (1 - returnRateDecimal));
        y -= Math.floor(res2Amount * 40 * (1 - returnRateDecimal));
        cat -= 40;
      }
    }
    else {
      csum += cat;
      x -= Math.floor(res1Amount * cat * (1 - returnRateDecimal));
      y -= Math.floor(res2Amount * cat * (1 - returnRateDecimal));
      cat = Math.floor(x / res1Amount);
    }
  }

  while (csum < craftingAmount) {
    pressCount++;
    csum++;
    xr += res1Amount - x;
    yr += res2Amount - y;
  }
  return [xr, yr, pressCount];
};
