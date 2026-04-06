
function InputWithLabel({ labelText = undefined, placeholder = "...", type = "number", value, setterFunction, extra = undefined, tooltip = undefined }) {
  const inputTypes = {
    number: ["bg-zinc-100 text-black w-24 px-2 py-1 rounded"],
    checkbox: ["w-4 h-4"]
  };

  const handleChange = (e) => {
    if (type === "number") {
      setterFunction(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber);
    } else if (type === "checkbox") {
      setterFunction(e.target.checked);
    }
  };

  return (
    <div className="flex flex-row gap-2 justify-center items-center mb-1">
      { labelText && 
        <div className="relative group">
          <label className="hover:text-amber-300">{labelText}</label>
          {tooltip}
        </div>
      }
      <input
        type={type}
        placeholder={placeholder}
        value={type === "number" ? (value === 0 ? "" : value) : undefined}
        checked={type === "checkbox" ? value : undefined}
        onChange={handleChange}
        className={inputTypes[type][0]}
      />
      {extra}
    </div>
  );
}

export default InputWithLabel;
