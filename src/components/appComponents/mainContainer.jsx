import { useState, useEffect } from "react";
import Menu from "../features/menu";
import ItemList from "../features/itemList";

function MainContainer({ className, onItemsChange }) {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addItem = (itemType, isArtifact, tier, enchant) => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: nextId,
        itemType: itemType,
        artifact: isArtifact,
        tier: tier,
        enchant: enchant
      }
    ]);
    setNextId(prev => prev + 1);
  };

  useEffect(() => {
    onItemsChange?.(items.length);
  }, [items]);

  return (
    <div className={`transition-transform duration-500 ease-out ${className}`}>
      <Menu onAddItem={addItem}/>
      <ItemList items={items}/>
    </div>
  );
}

export default MainContainer;
