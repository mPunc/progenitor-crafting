import { useState } from 'react';
import './App.css';
import Header from './components/header';
import Menu from './components/menu';
import OneItem from './components/oneItem';

function App() {
  const [items, setItems] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addItem = (isWeapon, isArtifact) => {
    setItems(prevItems => [
      ...prevItems,
      {
        id: nextId,
        weapon: isWeapon,
        artifact: isArtifact
      }
    ]);

    setNextId(prev => prev + 1);
  };

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-amber-500 font-barlow">
      <Header/>
      <Menu onAddItem={addItem}/>
      {items.map( item => (<OneItem key={item.id} isWeapon={item.weapon} isArtifact={item.artifact}/>))}
    </div>
  );
}

export default App;
