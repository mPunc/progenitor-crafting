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
  const [res1Value, setRes1Value] = useState(0);

  const [res2Amount, setRes2Amount] = useState(0);
  const [res2Value, setRes2Value] = useState(0);

  const [artifactValue, setArtifactValue] = useState(0);

  const [gameItemValue, setGameItemValue] = useState(0);
  const [returnRate, setReturnRate] = useState(0);

  const [targetAmount, setTargetAmount] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);
  const [stationTax, setStationTax] = useState(1000);
  const [havePremium, setHavePremium] = useState(true);

  const res1Total = res1Amount * res1Value;
  const res2Total = res2Amount * res2Value;
  const rawTotal = Number(res1Total) + Number(res2Total) + Number(artifactValue); // raw cost of resources, tells you basically nothing

  //

  const tax = getTax(havePremium);
  const orderTax = 0.025;
  const fullTax = tax + orderTax; // full market tax for selling and sell order

  const nutritionForOne = gameItemValue * 0.1125; // nutrition needed to craft one item
  const craftCostForOne = (Number(res1Total) + Number(res2Total)) * (1 - (Number(returnRate)/100))
    + Number(artifactValue)
    + Number(nutritionForOne) * stationTax / 100; // resource value sum * (1 - RR) + artifact value + crafting station tax (double check this)

  const profitForOne = itemPrice * (1 - (fullTax * 100)) - craftCostForOne; // selling price * (1 - tax) - craft cost
  const profit = profitForOne * targetAmount; // total profit
  const nutrition = nutritionForOne * targetAmount; // total nutrition needed for crafting station
  const craftingFee = nutrition * stationTax / 100; // crafting fee sum, usage of station (double check this)

  const fame = getFame(tier, enchant);
  const journal = getJournal(tier);
  
  const fameTotal = fame * (Number(res1Amount) + Number(res2Amount)) * targetAmount; // total fame gained without premium
  const journalAmount = fameTotal / journal; // how many journals you need for this craft

  const requiredReturnRate = null; // my thing, math on paper, needs tax added for precision

  return (
    <div className="flex flex-col items-start border-r border-zinc-500 pr-1 mb-4">
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
          value={res1Value === 0 ? "" : res1Value}
          onChange={(e) => setRes1Value(e.target.value)}
          className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
        />
      </div>

      <div className={ itemType == "armor" ? "hidden" : "flex flex-row gap-2 justify-center items-center mb-1" }>
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
          value={res2Value === 0 ? "" : res2Value}
          onChange={(e) => setRes2Value(e.target.value)}
          className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
        />
      </div>

      <div className={ isArtifact ? "flex flex-row gap-2 justify-center items-center mb-1" : "hidden"}>
        <label>Artifact value:</label>
        <input
          type="number"
          placeholder="..."
          value={artifactValue === 0 ? "" : artifactValue}
          onChange={(e) => setArtifactValue(e.target.value)}
          className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
        />
      </div>

      <hr className="border-t w-full border-zinc-500" />

      <div>
        {res2Total === 0 && artifactValue === 0 ? "" : `${formatNumber(res1Total)} `} 
        {res2Total === 0 ? "" : ` + ${formatNumber(res2Total)} `}
        {artifactValue === 0 ? "" : ` + ${formatNumber(artifactValue)} `}
        = <span className="text-amber-300">{formatNumber(rawTotal)}</span>
      </div>

      <hr className="border-t w-full border-zinc-500 mb-1" />

      <div className="flex flex-row gap-2 justify-center items-center mb-1">
        <label>Item value:</label>
        <input
          type="number"
          placeholder="..."
          value={gameItemValue === 0 ? "" : gameItemValue}
          onChange={(e) => setGameItemValue(e.target.value)}
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

      <hr className="border-t w-full border-zinc-500 mb-1" />

      <div className="flex flex-row gap-2 justify-center items-center mb-1">
        <label>Crafting amount:</label>
        <input
          type="number"
          placeholder="..."
          value={targetAmount === 0 ? "" : targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
        />
      </div>

      <div className="flex flex-row gap-2 justify-center items-center mb-1">
        <label>Item price:</label>
        <input
          type="number"
          placeholder="..."
          value={itemPrice === 0 ? "" : itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
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
        <label>Profit for one:</label>
        <div className="">
          {profitForOne}
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-center items-center mb-1">
        <label>Profit (with tax):</label>
        <div>
          {profit}
        </div>
      </div>
    </div>
  );
}

export default OneItem;
