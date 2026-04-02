import { useState } from "react";
import constants from "../data/constants.json";

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

function OneItem({ itemType, isArtifact, tier, enchant }) {
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

  const res1AmountTotalWithReturnRate = null; //need math for this, ask chatGPT
  const res2AmountTotalWithReturnRate = null;

  // extra displayed values:
  
  const rawTotal = Number(resPriceSum) + Number(artifactPrice); // raw cost of resources, tells you basically nothing

  const profitFromJournalForOne = profitFromJournal / craftingAmount;
  const requiredReturnRate = 1 - ((craftedItemPriceWithTax + profitFromJournalForOne - artifactPrice - craftingFeeForOne)/resPriceSum); // return rate required to break even, I cooked

  return (
    <div className="flex flex-row flex-wrap">
      <div className="flex flex-col items-start border-r border-zinc-500 pr-1 mr-2 mb-4">
        <div className="text-lg text-amber-300 underline italic">{itemType.charAt(0).toUpperCase() + itemType.slice(1)} {tier}.{enchant} {isArtifact ? "(artifact)" : ""}</div>
        
        {/* add duplicate button, add delete button */}

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Resource 1:</label>
          <input
            type="number"
            placeholder="Num"
            value={res1Amount === 0 ? "" : res1Amount}
            onChange={(e) => setRes1Amount(e.target.value)}
            className="bg-zinc-100 text-black w-12 px-2 py-1 rounded"
          />
          <div>X</div>
          <label className="sr-only">Resource 1 value:</label>
          <input
            type="number"
            placeholder="Value"
            value={res1Price === 0 ? "" : res1Price}
            onChange={(e) => setRes1Price(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <div className={ itemType === "armor" ? "hidden" : "flex flex-row gap-2 justify-center items-center mb-1" }>
          <label>Resource 2:</label>
          <input
            type="number"
            placeholder="Num"
            value={res2Amount === 0 ? "" : res2Amount}
            onChange={(e) => setRes2Amount(e.target.value)}
            className="bg-zinc-100 text-black w-12 px-2 py-1 rounded"
          />
          <div>X</div>
          <label className="sr-only">Resource 2 value:</label>
          <input
            type="number"
            placeholder="Value"
            value={res2Price === 0 ? "" : res2Price}
            onChange={(e) => setRes2Price(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <div className={ isArtifact ? "flex flex-row gap-2 justify-center items-center mb-1" : "hidden"}>
          <label>Artifact value:</label>
          <input
            type="number"
            placeholder="..."
            value={artifactPrice === 0 ? "" : artifactPrice}
            onChange={(e) => setArtifactPrice(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Item price:</label>
          <input
            type="number"
            placeholder="..."
            value={craftedItemPrice === 0 ? "" : craftedItemPrice}
            onChange={(e) => setCraftedItemPrice(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Return rate:</label>
          <input
            type="number"
            placeholder="..."
            value={returnRate === 0 ? "" : returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
          %
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Crafting amount:</label>
          <input
            type="number"
            placeholder="..."
            value={craftingAmount === 0 ? "" : craftingAmount}
            onChange={(e) => setCraftingAmount(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <hr className="border-t w-full border-zinc-500 mb-1" />

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Item value:</label>
          <input
            type="number"
            placeholder="..."
            value={itemValue === 0 ? "" : itemValue}
            onChange={(e) => setItemValue(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Crafting station tax:</label>
          <input
            type="number"
            placeholder="..."
            value={stationTax === 0 ? "" : stationTax}
            onChange={(e) => setStationTax(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

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

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Empty journal price:</label>
          <input
            type="number"
            placeholder="..."
            value={journalEmptyPrice === 0 ? "" : journalEmptyPrice}
            onChange={(e) => setJournalEmptyPrice(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>

        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>Full journal price:</label>
          <input
            type="number"
            placeholder="..."
            value={journalFullPrice === 0 ? "" : journalFullPrice}
            onChange={(e) => setJournalFullPrice(e.target.value)}
            className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
          />
        </div>
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
        
        <div className="flex flex-row gap-2 justify-center items-center mb-1">
          <label>RRR:</label>
          <div className="text-amber-300">
            {`${requiredReturnRate}`}
          </div>
        </div>

      </div>
    </div>
  );
}

export default OneItem;
