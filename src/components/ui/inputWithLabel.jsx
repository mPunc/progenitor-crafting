
function InputWithLabel({ labelText = null, placeholder = "...", type = "number", value, setterFunction, extra }) {
  return (
    <div className="flex flex-row gap-2 justify-center items-center mb-1">
      { labelText && <label>{labelText}</label> }
      <input
        type={type}
        placeholder={placeholder}
        value={value === 0 ? "" : value}
        onChange={(e) => setterFunction(e.target.valueAsNumber)}
        className="bg-zinc-100 text-black w-24 px-2 py-1 rounded"
      />
      {extra}
    </div>
  );
}

export default InputWithLabel;
