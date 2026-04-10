import { useState } from "react";
import Button from "../ui/button";
import DropdownWithLabel from "../ui/dropdownWithLabel";
import InputWithLabel from "../ui/inputWithLabel";

function Menu({ onAddItem }) {
  const [itemType, setItemType] = useState("weapon 2H");
  const [isArtifact, setIsArtifact] = useState(false);
  const [tier, setTier] = useState(4);
  const [enchant, setEnchant] = useState(0);

  return (
    <div className="flex flex-row flex-wrap justify-center pt-3 pb-3 gap-x-[5%] gap-y-1">
      <DropdownWithLabel
        labelText="Item type:"
        setterFunction={setItemType}
        values={["weapon 2H", "weapon 1H", "armor", "off-hand", "bag", "cape"]}
        selected={itemType}
        fontWeight="semibold"
      />

      <DropdownWithLabel
        labelText="Tier:"
        setterFunction={(e) => setTier(Number(e))}
        values={[4, 5, 6, 7, 8]}
        selected={tier}
        fontWeight="semibold"
      />

      <DropdownWithLabel
        labelText="Enchant:"
        setterFunction={(e) => setEnchant(Number(e))}
        selected={enchant}
        values={[0, 1, 2, 3, 4]}
        fontWeight="semibold"
      />

      <InputWithLabel
        labelText="Artifact"
        type="checkbox"
        value={isArtifact}
        setterFunction={setIsArtifact}
        border
        fontWeight="semibold"
      />

      <Button text="Add Item" color="green" onClick={() => onAddItem(itemType, isArtifact, tier, enchant)}/>
    </div>
  );
}

export default Menu;
