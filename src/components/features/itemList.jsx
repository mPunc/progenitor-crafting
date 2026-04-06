import CraftedItem from "./craftedItem";

function ItemList({ items = [] }) {
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {items.map( item => (
        <CraftedItem key={item.id} itemType={item.itemType} isArtifact={item.artifact} tier={item.tier} enchant={item.enchant}/>
      ))}
    </div>
  );
}

export default ItemList;
