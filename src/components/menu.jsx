import { useState } from "react";

function Menu({ onAddItem }) {
  const [isWeapon, setIsWeapon] = useState(true);
  const [isArtifact, setIsArtifact] = useState(false);

  return <>
    <label>
      Weapon
    </label>
    <input
      type="checkbox"
      checked={isWeapon}
      onChange={e => setIsWeapon(e.target.checked)}
    />

    <label>
      Artifact
    </label>
    <input
      type="checkbox"
      checked={isArtifact}
      onChange={e => setIsArtifact(e.target.checked)}
    />

    <button onClick={() => onAddItem(isWeapon, isArtifact)}>Add Item</button>
  </>;
}

export default Menu;
