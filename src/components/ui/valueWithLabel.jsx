
function ValueWithLabel({ labelText = undefined, value, direction = "col", valueColor = "basic", profitValue = undefined }) {
  const directionClasses = {
    col: "flex flex-col justify-center items-start mb-1",
    row: "flex flex-row gap-2 justify-center items-center mb-1"
  };

  const valueColorClasses = {
    basic: "text-amber-100",
    dark: "text-amber-300",
    darker: "text-amber-500",
    profit: profitValue < 0 ?  "text-red-500" : "text-green-500"
  };

  return (
    <div className={directionClasses[direction] || ""}
    >
      { labelText && <label className="underline">{labelText}</label> }
      <div className={valueColorClasses[valueColor] || ""}>
        {value}
      </div>
    </div>
  );
}

export default ValueWithLabel;
