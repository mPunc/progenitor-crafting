import { useState } from "react";

function OneItem({ isWeapon, isArtifact }) {
  const [res1Value, setRes1Value] = useState(0);
  const [res1Amount, setRes1Amount] = useState(0);

  const [res2Value, setRes2Value] = useState(0);
  const [res2Amount, setRes2Amount] = useState(0);

  const [artifactValue, setArtifactValue] = useState(0);

  return <>
    <div>
      <label>Resource 1 value:</label>
      <input
        type="number"
        value={res1Value}
        onChange={(e) => setRes1Value(e.target.value)}
      />
      <label>Resource 1 amount:</label>
      <input
        type="number"
        value={res1Amount}
        onChange={(e) => setRes1Amount(e.target.value)}
      />
      <p>Total resource 1 value: {res1Value * res1Amount}</p>
    </div>

    <div hidden={!isWeapon}>
      <label>Resource 2 value:</label>
      <input
        type="number"
        value={res2Value}
        onChange={(e) => setRes2Value(e.target.value)}
      />
      <label>Resource 2 amount:</label>
      <input
        type="number"
        value={res2Amount}
        onChange={(e) => setRes2Amount(e.target.value)}
      />
      <p>Total resource 2 value: {res2Value * res2Amount}</p>
    </div>

    <div hidden={!isArtifact}>
      <label>Artifact value:</label>
      <input
        type="number"
        value={artifactValue}
        onChange={(e) => setArtifactValue(e.target.value)}
      />
      <p>Artifact value: {artifactValue}</p>
    </div>
  </>;
}

export default OneItem;