import { useState } from "react";
import constants from "../../data/constants.json";
import InputWithLabel from "../ui/inputWithLabel";

const formatNumber = (num) =>
  Math.floor(Number(num)).toLocaleString();

const getFame = (tier, enchantment) => {
  return constants.fame[String(tier)][String(enchantment)];
};

const getJournal = (tier) => {
  return constants.journal[String(tier)];
};

const getTax = (havePremium) => {
  return constants.premium[String(havePremium)];
};

function CraftedItem({ itemType, isArtifact, tier, enchant }) {
  const [res1Amount, setRes1Amount] = useState(0);
  const [res1Price, setRes1Price] = useState(0);
  const [res2Amount, setRes2Amount] = useState(0);
  const [res2Price, setRes2Price] = useState(0);
  const [artifactPrice, setArtifactPrice] = useState(0);
  const [craftedItemPrice, setCraftedItemPrice] = useState(0);
  const [returnRate, setReturnRate] = useState(24.8);
  const [craftingAmount, setCraftingAmount] = useState(1);
  const [itemValue, setItemValue] = useState(0); // in-game constant value
  const [stationTax, setStationTax] = useState(1000);
  const [havePremium, setHavePremium] = useState(true);
  const [journalEmptyPrice, setJournalEmptyPrice] = useState(0);
  const [journalFullPrice, setJournalFullPrice] = useState(0);

  // calculated helper values:

  const res1TotalPrice = res1Amount * res1Price;
  const res2TotalPrice = res2Amount * res2Price;
  const resPriceSum = res1TotalPrice + res2TotalPrice;
  
  const sellTax = getTax(havePremium); // gets 4% or 8% based on premium status
  const orderTax = 2.5; // always 2.5%
  const fullTax = sellTax + orderTax; // full tax for using market, sell order (6.5% or 10.5%)
  
  const fullTaxDecimal = fullTax / 100; // use for cleaner expressions
  const returnRateDecimal = returnRate / 100; // use for cleaner expressions
  
  const nutritionForOne = itemValue * 0.1125; // nutrition needed for crafting one item
  const craftingFeeForOne = nutritionForOne * stationTax / 100; // crafting fee for crafting one item
  
  const fameCoefficient = getFame(tier, enchant); // it works, trust me
  const journal = getJournal(tier); // fame required to fill one journal

  const craftCostForOne = (Number(resPriceSum) * (1 - returnRateDecimal)) + Number(artifactPrice) + Number(craftingFeeForOne);
  const craftedItemPriceWithTax = craftedItemPrice * (1 - fullTaxDecimal);
  const journalFullPriceWithTax = journalFullPrice * (1 - fullTaxDecimal);

  // final values to display:
  const nutritionTotal = nutritionForOne * craftingAmount; // total nutrition needed for crafting
  const craftingFeeTotal = Math.round(nutritionTotal * stationTax / 100); // total crafting fee amount
  
  const profitForOne = craftedItemPriceWithTax - craftCostForOne;
  const profitFromCrafted = profitForOne * craftingAmount; // profit from selling crafted items
  
  const fameTotal = fameCoefficient * (Number(res1Amount) + Number(res2Amount)) * craftingAmount; // total fame gained without premium
  const journalAmount = fameTotal / journal; // how many journals you can fill with this craft
  const profitFromJournal = (journalFullPriceWithTax - journalEmptyPrice) * journalAmount; // profit from filling and selling journals
  
  const profitTotal = profitFromCrafted + profitFromJournal; // final profit, most important value, depends on everything
  
  const res1AmountTotal = res1Amount * craftingAmount;
  const res2AmountTotal = res2Amount * craftingAmount;

  // simulates and calculates worst case scenarion of how many times you need to press "craft" in-game
  const craftSimulationWorstCase = () => {
    if (craftingAmount <= 1) return [];
    let productionOutput = 1 / (1 - returnRateDecimal);
    let x = Math.ceil(res1AmountTotal / productionOutput);
    let y = Math.ceil(res2AmountTotal / productionOutput);
    let xr = x; // res 1 required
    let yr = y; // res 2 required
    let cat = Math.floor(x / res1Amount); // crafting amount temporary
    let csum = 0;
    let pressCount = 0; // craft button press counter
    console.log(x, y);

    while (x >= res1Amount && y >= res2Amount) {
      pressCount++;
      if (cat >= 40) {
        while (cat >= 40) {
          csum += 40;
          console.log("meow");
          x -= Math.floor(res1Amount * 40 * (1 - returnRateDecimal));
          y -= Math.floor(res2Amount * 40 * (1 - returnRateDecimal));
          console.log(x, y);
          cat -= 40;
        }
      }
      else {
        csum += cat;
        x -= Math.floor(res1Amount * cat * (1 - returnRateDecimal));
        y -= Math.floor(res2Amount * cat * (1 - returnRateDecimal));
        console.log(x, y);
        cat = Math.floor(x / res1Amount);
      }
    }
    console.log(pressCount, csum);
    while (csum < craftingAmount) {
      pressCount++;
      csum++;
      xr += res1Amount - x;
      yr += res2Amount - y;
    }
    console.log(xr, yr);
    return [xr, yr, pressCount];
  };
 
  const [res1AmountTotalWithReturnRate, res2AmountTotalWithReturnRate, buttonPressAmount] = 
    craftingAmount <= 1 ? [res1Amount, res2Amount, 1] : craftSimulationWorstCase();

  // extra displayed values:
  
  const rawTotal = Number(resPriceSum) + Number(artifactPrice); // raw cost of resources, tells you basically nothing

  const profitFromJournalForOne = profitFromJournal / craftingAmount;
  const requiredReturnRate = 1 - ((craftedItemPriceWithTax + profitFromJournalForOne - artifactPrice - craftingFeeForOne)/resPriceSum); // return rate required to break even, I cooked

  return (
    <div className="flex flex-row flex-wrap">
      <div className="flex flex-col items-start border-r border-zinc-500 pr-1 mr-2 mb-4">
        <div className="text-lg text-amber-300 underline italic">{itemType.charAt(0).toUpperCase() + itemType.slice(1)} {tier}.{enchant} {isArtifact ? "(artifact)" : ""}</div>
        
        {/* add duplicate button, add delete button */}

        <div className="flex flex-row gap-2 justify-center items-center mb-1" >
          <InputWithLabel
            labelText="Resource 1:"
            value={res1Amount}
            placeholder="Num"
            setterFunction={setRes1Amount}
            extra="X"
          />
          <InputWithLabel
            value={res1Price}
            placeholder="Price"
            setterFunction={setRes1Price}
          />
        </div>

        { itemType !== "armor" && 
        <div className="flex flex-row gap-2 justify-center items-center mb-1" >
          <InputWithLabel
            labelText="Resource 2:"
            value={res2Amount}
            placeholder="Num"
            setterFunction={setRes2Amount}
            extra="X"
          />
          <InputWithLabel
            value={res2Price}
            placeholder="Price"
            setterFunction={setRes2Price}
          />
        </div>
        }

        { isArtifact &&
        <InputWithLabel
          labelText="Artifact price:"
          value={artifactPrice}
          setterFunction={setArtifactPrice}
        />
        }

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <InputWithLabel
          labelText="Market price:"
          value={craftedItemPrice}
          setterFunction={setCraftedItemPrice}
        />

        <InputWithLabel
          labelText="Return rate:"
          value={returnRate}
          setterFunction={setReturnRate}
          extra="%"
        />

        <InputWithLabel
          labelText="Crafting amount:"
          value={craftingAmount}
          setterFunction={setCraftingAmount}
        />

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <InputWithLabel
          labelText="Item value:"
          value={itemValue}
          setterFunction={setItemValue}
        />

        <InputWithLabel
          labelText="Crafting station tax:"
          value={stationTax}
          setterFunction={setStationTax}
        />

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Premium:</label>
          <input
            type="checkbox"
            checked={havePremium}
            onChange={e => setHavePremium(e.target.checked)}
            className="w-4 h-4"
          />
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <InputWithLabel
          labelText="Empty journal price:"
          value={journalEmptyPrice}
          setterFunction={setJournalEmptyPrice}
        />

        <InputWithLabel
          labelText="Full journal price:"
          value={journalFullPrice}
          setterFunction={setJournalFullPrice}
        />

      </div>

      <div className="flex flex-col items-start border-r border-zinc-500 pr-1 mr-2 mb-4">
        <div>
          {res2TotalPrice === 0 && artifactPrice === 0 ? "" : `${formatNumber(res1TotalPrice)} `} 
          {res2TotalPrice === 0 ? "" : ` + ${formatNumber(res2TotalPrice)} `}
          {artifactPrice === 0 ? "" : ` + ${formatNumber(artifactPrice)} `}
          = <span className="text-amber-300">{formatNumber(rawTotal)} (raw cost)</span>
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Profit for one:</label>
          <div className="text-amber-300">
            {`${formatNumber(craftedItemPriceWithTax)} (${fullTax}% tax) - ${formatNumber(craftCostForOne)}`} = <span className="text-amber-100">{`${formatNumber(profitForOne)}`}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Crafting fee / total nutrition:</label>
          <div className="text-amber-100">
            {`${formatNumber(craftingFeeTotal)} / ${formatNumber(nutritionTotal)}`}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Profit from items (with tax):</label>
          <div className={profitFromCrafted < 0 ? "text-red-500" : "text-green-500"}>
            {`${formatNumber(profitFromCrafted)} (${fullTax}% tax)`}
          </div>
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Fame gained (without premium):</label>
          <div className="text-amber-100">
            {`${formatNumber(fameTotal)}`}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Journal amount:</label>
          <div className="text-amber-100">
            {`${journalAmount}`}
          </div>
        </div>

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Profit from journals (with tax):</label>
          <div className={profitFromJournal < 0 ? "text-red-500" : "text-green-500"}>
            {`${formatNumber(profitFromJournal)} (${fullTax}% tax)`}
          </div>
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <div className="flex flex-col justify-center items-start mb-1">
          <label className="underline">Total profit:</label>
          <div className={profitTotal < 0 ? "text-red-500" : "text-green-500"}>
            {`${formatNumber(profitTotal)}`}
          </div>
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />
        
        <div className="relative group flex flex-row gap-2 justify-center items-center mb-1">
          <label>RRR:</label>
          <div className="text-amber-300">
            {`${requiredReturnRate}`}
          </div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
            pointer-events-none
            bg-amber-800 text-amber-100 text-sm
            px-2 py-1 rounded whitespace-nowrap"
          >
            Resource return rate required to break even
            <span className="absolute bottom-full left-1/2 -translate-x-1/2
              border-4 border-transparent
              border-b-amber-800"
            />
          </span>
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Resource 1 req:</label>
          <div className="text-amber-300">
            {`${res1AmountTotalWithReturnRate}`}
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Resource 2 req:</label>
          <div className="text-amber-300">
            {`${res2AmountTotalWithReturnRate}`}
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>"Craft" button presses:</label>
          <div className="text-amber-300">
            {`${buttonPressAmount}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CraftedItem;
