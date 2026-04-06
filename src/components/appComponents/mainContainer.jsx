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

  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const duplicateItem = (id) => {
    setItems(prevItems => {
      const itemToCopy = prevItems.find(item => item.id === id);
      if (!itemToCopy) return prevItems;
      return [
        ...prevItems,
        {
          ...itemToCopy,
          id: nextId
        }
      ];
    });
    setNextId(prev => prev + 1);
  };

  useEffect(() => {
    onItemsChange?.(items.length);
  }, [items]);

  return (
    <div className={`transition-transform duration-500 ease-in-out ${className}`}>
      <Menu onAddItem={addItem}/>
      <ItemList items={items} onDelete={deleteItem} onDuplicate={duplicateItem}/>
    </div>
  );
}

export default MainContainer;
