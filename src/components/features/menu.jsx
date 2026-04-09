import { useState } from "react";
import Button from "../ui/button";

function Menu({ onAddItem }) {
  const [itemType, setItemType] = useState("weapon");
  const [isArtifact, setIsArtifact] = useState(false);
  const [tier, setTier] = useState(4);
  const [enchant, setEnchant] = useState(0);

  return (
    <div className="flex flex-row justify-center pt-3 pb-3 gap-x-8">
      <select
        value={itemType}
        onChange={(e) => setItemType(e.target.value)}
        className="rounded-lg px-2 py-1 border border-amber-500 bg-neutral-900"
      >
        <option value="weapon">Weapon</option>
        <option value="armor">Armor</option>
        <option value="bag">Bag/Cape</option>
      </select>

      <label className="rounded-lg px-2 py-1 border border-amber-500 flex flex-row items-center gap-2">
        Artifact
        <input
          type="checkbox"
          checked={isArtifact}
          onChange={e => setIsArtifact(e.target.checked)}
          className="w-4 h-4"
        />
      </label>

      <label className="flex flex-row items-center gap-2">
        Tier:
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          className="rounded-lg px-2 py-1 border border-amber-500 bg-neutral-900 self-stretch"
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </label>

      <label className="flex flex-row items-center gap-2">
        Enchant:
        <select
          value={enchant}
          onChange={(e) => setEnchant(e.target.value)}
          className="rounded-lg px-2 py-1 border border-amber-500 bg-neutral-900 self-stretch"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </label>

      <Button text="Add Item" color="green" onClick={() => onAddItem(itemType, isArtifact, tier, enchant)}/>
    </div>
  );
}

export default Menu;
