
function DropdownWithLabel({ labelText = undefined, setterFunction, values, selected, tooltip = undefined }) {
  return (
    <div className="flex flex-row justify-center items-center gap-1">
      { labelText &&
      <div className="relative group">
        <label className="hover:text-amber-300">{labelText}</label>
        {tooltip}
      </div>
      }
      <select
        value={selected}
        className="rounded-lg px-2 py-2 border border-amber-500 bg-neutral-900"
        onChange={(e) => setterFunction(e.target.value)}
      >
        { values.map( value =>
          <option value={value}>{value}</option>
        )}
      </select>
    </div>
  );
}

export default DropdownWithLabel;
