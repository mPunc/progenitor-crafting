import { useState } from 'react';
import Header from './components/features/header';
import Menu from './components/features/menu';
import CraftedItem from './components/features/craftedItem';
import Footer from './components/features/footer';

function App() {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);

  const hasItems = items.length > 0;

  // move this function later, create separate component maybe
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

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-amber-500 font-barlow">
      <Header className={hasItems ? '-translate-y-full hidden' : 'translate-y-0'}/>
      <Menu onAddItem={addItem} className={hasItems ? '-translate-y-0' : 'translate-y-0'}/>

      <div className="flex flex-row flex-wrap justify-center">
        {items.map( item => (
          <CraftedItem key={item.id} itemType={item.itemType} isArtifact={item.artifact} tier={item.tier} enchant={item.enchant}/>
        ))}
      </div>

      <Footer className={hasItems ? 'translate-y-full' : 'translate-y-0'}/>
    </div>
  );
}

export default App;
