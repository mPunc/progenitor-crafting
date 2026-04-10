import { capitalize } from "../../utils/displayFormatters";

function DropdownWithLabel({
  labelText = undefined,
  setterFunction,
  values,
  selected,
  tooltip = undefined,
  fontWeight = "normal",
  color = "base"
}) {
  const fontWeights = {
    normal : "font-normal",
    semibold : "font-semibold"
  };

  const colorOptions = {
    base : "text-black border-black bg-amber-500",
    white : "text-black border-black bg-white"
  };
  
  return (
    <div className={`flex flex-row justify-center items-center gap-1 ${fontWeights[fontWeight]}`}>
      { labelText &&
      <div className="relative group">
        <label className="hover:text-amber-300">{labelText}</label>
        {tooltip}
      </div>
      }
      <select
        value={selected}
        className={`rounded-lg px-2 py-2 border ${colorOptions[color]}`}
        onChange={(e) => setterFunction(e.target.value)}
      >
        { values?.map( value =>
          <option className={`${fontWeights[fontWeight]}`} value={value}>{capitalize(value)}</option>
        )}
      </select>
    </div>
  );
}

export default DropdownWithLabel;
