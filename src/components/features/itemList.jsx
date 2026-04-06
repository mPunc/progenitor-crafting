import CraftedItem from "./craftedItem";

function ItemList({ items = [], onDelete, onDuplicate }) {
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {items.map( item => (
        <CraftedItem
          key={item.id}
          itemType={item.itemType}
          isArtifact={item.artifact}
          tier={item.tier}
          enchant={item.enchant}
          onDelete={() => onDelete(item.id)}
          onDuplicate={() => onDuplicate(item.id)}
        />
      ))}
    </div>
  );
}

export default ItemList;
