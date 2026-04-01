import { useState } from "react";

function Menu({ onAddItem }) {
  const [itemType, setItemType] = useState("weapon");
  const [isArtifact, setIsArtifact] = useState(false);

  return (
    <div className="flex flex-row justify-center items-center pb-3 gap-x-8">
      <select
        value={itemType}
        onChange={(e) => setItemType(e.target.value)}
        className="rounded-lg px-2 py-1 border border-amber-500 bg-neutral-900"
      >
        <option value="weapon">Weapon</option>
        <option value="armor">Armor</option>
        <option value="bag">Bag/Cape</option>
      </select>

      <label className="rounded-lg px-2 py-1 border border-amber-500 flex items-center gap-2">
        Artifact
        <input
          type="checkbox"
          checked={isArtifact}
          onChange={e => setIsArtifact(e.target.checked)}
          className="w-4 h-4"
        />
      </label>

      <button onClick={() => onAddItem(itemType, isArtifact)}>Add Item</button>
    </div>
  );
}

export default Menu;
