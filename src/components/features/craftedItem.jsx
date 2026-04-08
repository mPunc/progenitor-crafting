import { useState } from "react";
import InputWithLabel from "../ui/inputWithLabel";
import HorizontalLine from "../ui/horizontalLine";
import ValueWithLabel from "../ui/valueWithLabel";
import Tooltip from "../ui/tooltip";
import { craftingSimulationWorstCase } from "../../utils/craftingSimulation";
import { formatNumber, getFameCoefficient, getJournal, getTax } from "../../utils/constantGetters";

function CraftedItem({ itemType, isArtifact, tier, enchant, onDelete, onDuplicate }) {
  const [values, setValues] = useState({
    tier: tier,
    enchant: enchant,
    res1Amount: 0,
    res1Price: 0,
    res2Amount: 0,
    res2Price: 0,
    artifactPrice: 0,
    craftedItemPrice: 0,
    returnRate: 24.8,
    craftingAmount: 1,
    itemValue: 0,
    stationTax: 1000,
    havePremium: true,
    journalEmptyPrice: 0,
    journalFullPrice: 0
  });

  const handleSetValues = (field, val) => {
    setValues((prev) => ({
      ...prev,
      [field]: val
    }))
  }

  // calculated helper values:
  const res1TotalPrice = values.res1Amount * values.res1Price;
  const res2TotalPrice = values.res2Amount * values.res2Price;
  const resPriceSum = res1TotalPrice + res2TotalPrice;
  
  const sellTax = getTax(values.havePremium); // gets 4% or 8% based on premium status
  const orderTax = 2.5; // always 2.5%
  const fullTax = sellTax + orderTax; // full tax for using market, sell order (6.5% or 10.5%)
  
  const fullTaxDecimal = fullTax / 100; // use for cleaner expressions
  const returnRateDecimal = values.returnRate / 100; // use for cleaner expressions
  
  const nutritionForOne = values.itemValue * 0.1125; // nutrition needed for crafting one item
  const craftingFeeForOne = nutritionForOne * values.stationTax / 100; // crafting fee for crafting one item
  
  const fameCoefficient = getFameCoefficient(values.tier, values.enchant); // it works, trust me
  const journal = getJournal(values.tier); // fame required to fill one journal

  const craftCostForOne = (resPriceSum * (1 - returnRateDecimal)) + values.artifactPrice + craftingFeeForOne;
  const craftedItemPriceWithTax = values.craftedItemPrice * (1 - fullTaxDecimal);
  const journalFullPriceWithTax = values.journalFullPrice * (1 - fullTaxDecimal);

  // final values to display:
  const nutritionTotal = nutritionForOne * values.craftingAmount; // total nutrition needed for crafting
  const craftingFeeTotal = Math.round(nutritionTotal * values.stationTax / 100); // total crafting fee amount
  
  const profitForOne = craftedItemPriceWithTax - craftCostForOne;
  const profitFromCrafted = profitForOne * values.craftingAmount; // profit from selling crafted items
  
  const fameTotal = fameCoefficient * (values.res1Amount + values.res2Amount) * values.craftingAmount; // total fame gained without premium
  const journalAmount = fameTotal / journal; // how many journals you can fill with this craft
  const profitFromJournal = (journalFullPriceWithTax - values.journalEmptyPrice) * journalAmount; // profit from filling and selling journals
  
  const profitTotal = profitFromCrafted + profitFromJournal; // final profit, most important value, depends on everything
  
  const res1AmountTotal = values.res1Amount * values.craftingAmount;
  const res2AmountTotal = values.res2Amount * values.craftingAmount;
 
  const [res1AmountTotalWithReturnRate, res2AmountTotalWithReturnRate, buttonPressAmount] = 
    values.craftingAmount <= 1 ? [values.res1Amount, values.res2Amount, 1] : craftingSimulationWorstCase(values.craftingAmount, returnRateDecimal, res1AmountTotal, values.res1Amount, res2AmountTotal, values.res2Amount);

  // extra displayed values:
  const rawTotal = resPriceSum + values.artifactPrice; // raw cost of resources, tells you basically nothing

  const profitFromJournalForOne = profitFromJournal / values.craftingAmount;
  const requiredReturnRate = 1 - ((craftedItemPriceWithTax + profitFromJournalForOne - values.artifactPrice - craftingFeeForOne)/resPriceSum); // return rate required to break even, I cooked

  return (
    <div className="flex flex-row flex-wrap">
      <div className="flex flex-col items-start border-r border-zinc-500 pr-1 mr-2 mb-4">
        <div className="text-lg text-amber-300 underline italic">{itemType.charAt(0).toUpperCase() + itemType.slice(1)} {values.tier}.{values.enchant} {isArtifact ? "(artifact)" : ""}</div>
        
        <button className="text-black bg-amber-300 rounded px-1 py-1" onClick={onDelete}>
          Delete
        </button>

        <button className="text-black bg-amber-300 rounded px-1 py-1" onClick={onDuplicate}>
          Duplicate
        </button>

        <div className="flex flex-row gap-2 justify-center items-center mb-1" >
          <InputWithLabel
            labelText="Resource 1:"
            value={values.res1Amount}
            placeholder="Num"
            setterFunction={(val) => handleSetValues("res1Amount", val)}
            extra="X"
            tooltip={<Tooltip text="e.g. 16 x 4,400"/>}
          />
          <InputWithLabel
            value={values.res1Price}
            placeholder="Price"
            setterFunction={(val) => handleSetValues("res1Price", val)}
          />
        </div>

        { itemType !== "armor" && 
        <div className="flex flex-row gap-2 justify-center items-center mb-1" >
          <InputWithLabel
            labelText="Resource 2:"
            value={values.res2Amount}
            placeholder="Num"
            setterFunction={(val) => handleSetValues("res2Amount", val)}
            extra="X"
            tooltip={<Tooltip text="e.g. 8 x 5,100"/>}
          />
          <InputWithLabel
            value={values.res2Price}
            placeholder="Price"
            setterFunction={(val) => handleSetValues("res2Price", val)}
          />
        </div>
        }

        { isArtifact &&
        <InputWithLabel
          labelText="Artifact price:"
          value={values.artifactPrice}
          setterFunction={(val) => handleSetValues("artifactPrice", val)}
        />
        }

        <HorizontalLine/>

        <InputWithLabel
          labelText="Market price:"
          value={values.craftedItemPrice}
          setterFunction={(val) => handleSetValues("craftedItemPrice", val)}
          tooltip={<Tooltip text="e.g. sell order price (silver)"/>}
        />

        <InputWithLabel
          labelText="Return rate:"
          value={values.returnRate}
          setterFunction={(val) => handleSetValues("returnRate", val)}
          extra="%"
        />

        <InputWithLabel
          labelText="Crafting amount:"
          value={values.craftingAmount}
          setterFunction={(val) => handleSetValues("craftingAmount", val)}
          tooltip={<Tooltip text="how many of this specific item"/>}
        />

        <HorizontalLine/>

        <InputWithLabel
          labelText="Item value:"
          value={values.itemValue}
          setterFunction={(val) => handleSetValues("itemValue", val)}
          tooltip={<Tooltip text="in-game value in description of items"/>}
        />

        <InputWithLabel
          labelText="Crafting station tax:"
          value={values.stationTax}
          setterFunction={(val) => handleSetValues("stationTax", val)}
          tooltip={<Tooltip text="max 1000"/>}
        />

        <InputWithLabel
          labelText="Premium:"
          type="checkbox"
          value={values.havePremium}
          setterFunction={(val) => handleSetValues("havePremium", val)}
          tooltip={<Tooltip text="Do you have premium?"/>}
        />

        <HorizontalLine/>

        <InputWithLabel
          labelText="Empty journal price:"
          value={values.journalEmptyPrice}
          setterFunction={(val) => handleSetValues("journalEmptyPrice", val)}
        />

        <InputWithLabel
          labelText="Full journal price:"
          value={values.journalFullPrice}
          setterFunction={(val) => handleSetValues("journalFullPrice", val)}
        />

      </div>

      <div className="flex flex-col items-start border-r border-zinc-500 pr-1 mr-2 mb-4">
        <ValueWithLabel
          value={
            <>
              {res2TotalPrice === 0 && values.artifactPrice === 0 ? undefined : formatNumber(res1TotalPrice)}
              {res2TotalPrice === 0 ? undefined : " + " + formatNumber(res2TotalPrice)}
              {values.artifactPrice === 0 ? undefined : " + " + (formatNumber(values.artifactPrice))} = {""}
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
          tooltip={<Tooltip text="total fee in silver / nutrition consumed for crafting" position="top"/>}
        />

        <ValueWithLabel
          labelText="Profit from items (with tax):"
          value={`${formatNumber(profitFromCrafted)} (${fullTax}% tax)`}
          valueColor="profit"
          profitValue={profitFromCrafted}
          tooltip={<Tooltip text="Are you making money?" position="top"/>}
        />

        <HorizontalLine/>

        <ValueWithLabel
          labelText="Fame gained (without premium):"
          value={`${formatNumber(fameTotal)}`}
          tooltip={<Tooltip text="fame that goes into journals" position="top"/>}
        />

        <ValueWithLabel
          labelText="Journals filled:"
          value={`${journalAmount}`}
          tooltip={<Tooltip text="you can fill this many journals" position="top"/>}
        />

        <ValueWithLabel
          labelText="Profit from journals (with tax):"
          value={`${formatNumber(profitFromJournal)} (${fullTax}% tax)`}
          valueColor="profit"
          profitValue={profitFromJournal}
          tooltip={<Tooltip text="some extra cash" position="top"/>}
        />

        <HorizontalLine/>

        <ValueWithLabel
          labelText="Total profit:"
          value={`${formatNumber(profitTotal)}`}
          valueColor="profit"
          profitValue={profitTotal}
          tooltip={<Tooltip text="MOST IMPORTANT VALUE" position="top"/>}
        />

        <HorizontalLine/>
        
        <ValueWithLabel
          labelText="RRR:"
          value={`${requiredReturnRate}`}
          direction="row"
          valueColor="dark"
          tooltip={<Tooltip text="resource return rate required to break even" position="top"/>}
        />

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
