import { useState } from 'react';
import Header from './components/features/header';
import Menu from './components/features/menu';
import OneItem from './components/features/oneItem';
import Footer from './components/features/footer';

function App() {
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

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-amber-500 font-barlow">
      <Header/>
      <Menu onAddItem={addItem}/>
      <div className="flex flex-row flex-wrap mx-4 justify-center">
        {items.map( item => (
          <OneItem key={item.id} itemType={item.itemType} isArtifact={item.artifact} tier={item.tier} enchant={item.enchant}/>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
