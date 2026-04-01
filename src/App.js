import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Menu from './components/menu';
import OneItem from './components/oneItem';

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
      <div className="flex flex-row flex-wrap gap-4 mx-8 justify-center">
        {items.map( item => (
          <OneItem key={item.id} itemType={item.itemType} isArtifact={item.artifact} tier={item.tier} enchant={item.enchant}/>
        ))}
      </div>
    </div>
  );
}

export default App;
