import { useState } from "react";
import Button from "../ui/button";
import DropdownWithLabel from "../ui/dropdownWithLabel";
import InputWithLabel from "../ui/inputWithLabel";

function Menu({ onAddItem }) {
  const [itemType, setItemType] = useState("weapon");
  const [isArtifact, setIsArtifact] = useState(false);
  const [tier, setTier] = useState(4);
  const [enchant, setEnchant] = useState(0);

  return (
    <div className="flex flex-row flex-wrap justify-center pt-3 pb-3 gap-x-[5%] gap-y-1">
      <DropdownWithLabel
        labelText="Item type:"
        setterFunction={setItemType}
        values={["weapon", "armor", "bag"]}
        selected={itemType}
      />

      <InputWithLabel
        labelText="Artifact"
        type="checkbox"
        value={isArtifact}
        setterFunction={setIsArtifact}
        border
      />

      <DropdownWithLabel
        labelText="Tier:"
        setterFunction={setTier}
        values={[4, 5, 6, 7, 8]}
        selected={tier}
      />

      <DropdownWithLabel
        labelText="Enchant:"
        setterFunction={setEnchant}
        selected={enchant}
        values={[0, 1, 2, 3, 4]}
      />

      <Button text="Add Item" color="green" onClick={() => onAddItem(itemType, isArtifact, tier, enchant)}/>
    </div>
  );
}

export default Menu;
