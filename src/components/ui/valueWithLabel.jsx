
function ValueWithLabel({ labelText = undefined, value, direction = "col", valueColor = "basic", profitValue = undefined, tooltip = undefined }) {
  const directionClasses = {
    col: "flex flex-col justify-center items-start",
    row: "flex flex-row gap-2 justify-center items-center"
  };

  const valueColorClasses = {
    basic: "text-amber-100",
    dark: "text-amber-300",
    darker: "text-amber-500",
    profit: profitValue < 0 ?  "text-red-500" : "text-green-500"
  };

  return (
    <div className={directionClasses[direction] || ""} >
      { labelText &&
      <div className="relative group">
        <label className="hover:text-amber-100 underline">{labelText}</label>
        {tooltip}
      </div>
      }
      <div className={valueColorClasses[valueColor] || ""}>
        {value}
      </div>
    </div>
  );
}

export default ValueWithLabel;
