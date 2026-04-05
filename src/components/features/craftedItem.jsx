import { useState } from "react";
import InputWithLabel from "../ui/inputWithLabel";
import HorizontalLine from "../ui/horizontalLine";
import ValueWithLabel from "../ui/valueWithLabel";
import Tooltip from "../ui/tooltip";
import { craftingSimulationWorstCase } from "../../utils/craftingSimulation";
import { formatNumber, getFameCoefficient, getJournal, getTax } from "../../utils/constantGetters";

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
  
  const fameCoefficient = getFameCoefficient(tier, enchant); // it works, trust me
  const journal = getJournal(tier); // fame required to fill one journal

  const craftCostForOne = (resPriceSum * (1 - returnRateDecimal)) + artifactPrice + craftingFeeForOne;
  const craftedItemPriceWithTax = craftedItemPrice * (1 - fullTaxDecimal);
  const journalFullPriceWithTax = journalFullPrice * (1 - fullTaxDecimal);

  // final values to display:
  const nutritionTotal = nutritionForOne * craftingAmount; // total nutrition needed for crafting
  const craftingFeeTotal = Math.round(nutritionTotal * stationTax / 100); // total crafting fee amount
  
  const profitForOne = craftedItemPriceWithTax - craftCostForOne;
  const profitFromCrafted = profitForOne * craftingAmount; // profit from selling crafted items
  
  const fameTotal = fameCoefficient * (res1Amount + res2Amount) * craftingAmount; // total fame gained without premium
  const journalAmount = fameTotal / journal; // how many journals you can fill with this craft
  const profitFromJournal = (journalFullPriceWithTax - journalEmptyPrice) * journalAmount; // profit from filling and selling journals
  
  const profitTotal = profitFromCrafted + profitFromJournal; // final profit, most important value, depends on everything
  
  const res1AmountTotal = res1Amount * craftingAmount;
  const res2AmountTotal = res2Amount * craftingAmount;
 
  const [res1AmountTotalWithReturnRate, res2AmountTotalWithReturnRate, buttonPressAmount] = 
    craftingAmount <= 1 ? [res1Amount, res2Amount, 1] : craftingSimulationWorstCase(craftingAmount, returnRateDecimal, res1AmountTotal, res1Amount, res2AmountTotal, res2Amount);

  // extra displayed values:
  const rawTotal = resPriceSum + artifactPrice; // raw cost of resources, tells you basically nothing

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

        <HorizontalLine/>

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

        <HorizontalLine/>

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

        <InputWithLabel
          labelText="Premium:"
          type="checkbox"
          value={havePremium}
          setterFunction={setHavePremium}
          extra={<Tooltip text="test tooltip 1 2 3"/>}
        />

        <HorizontalLine/>

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
        <ValueWithLabel
          value={
            <>
              {res2TotalPrice === 0 && artifactPrice === 0 ? undefined : formatNumber(res1TotalPrice)}
              {res2TotalPrice === 0 ? undefined : " + " + formatNumber(res2TotalPrice)}
              {artifactPrice === 0 ? undefined : " + " + (formatNumber(artifactPrice))} = {""}
              <span className="text-amber-300">{formatNumber(rawTotal)} (raw cost)</span>
            </>
          }
          valueColor="darker"
        />

        <HorizontalLine/>

        <ValueWithLabel
          labelText="Profit for one:"
          value={
            <>
              {formatNumber(craftedItemPriceWithTax)} ({fullTax}% tax) - {""}
              {formatNumber(craftCostForOne)} = {""}
              <span className="text-amber-100">{formatNumber(profitForOne)}</span>
            </>
          }
          valueColor="dark"
        />

        <ValueWithLabel
          labelText="Crafting fee / total nutrition:"
          value={`${formatNumber(craftingFeeTotal)} / ${formatNumber(nutritionTotal)}`}
        />

        <ValueWithLabel
          labelText="Profit from items (with tax):"
          value={`${formatNumber(profitFromCrafted)} (${fullTax}% tax)`}
          valueColor="profit"
          profitValue={profitFromCrafted}
        />

        <HorizontalLine/>

        <ValueWithLabel
          labelText="Fame gained (without premium):"
          value={`${formatNumber(fameTotal)}`}
        />

        <ValueWithLabel
          labelText="Journals filled:"
          value={`${journalAmount}`}
        />

        <ValueWithLabel
          labelText="Profit from journals (with tax):"
          value={`${formatNumber(profitFromJournal)} (${fullTax}% tax)`}
          valueColor="profit"
          profitValue={profitFromJournal}
        />

        <HorizontalLine/>

        <ValueWithLabel
          labelText="Total profit:"
          value={`${formatNumber(profitTotal)}`}
          valueColor="profit"
          profitValue={profitTotal}
        />

        <HorizontalLine/>
        
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

        <ValueWithLabel
          labelText="Resource 1 req:"
          value={`${res1AmountTotalWithReturnRate}`}
          direction="row"
          valueColor="dark"
        />

        { itemType !== "armor" &&
        <ValueWithLabel
          labelText="Resource 2 req:"
          value={`${res2AmountTotalWithReturnRate}`}
          direction="row"
          valueColor="dark"
        />
        }

        <ValueWithLabel
          labelText='"Craft" button presses:'
          value={`${buttonPressAmount}`}
          direction="row"
          valueColor="dark"
        />
      </div>
    </div>
  );
}

export default CraftedItem;
