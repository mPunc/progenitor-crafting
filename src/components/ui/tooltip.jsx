
function Tooltip({ text, position = "bottom" }) {
  const positionClasses = {
    bottom: ["top-full", "bottom-full", "border-b-amber-800"],
    top: ["bottom-full", "top-full", "border-t-amber-800"]
  };
  return (
    <div className={`absolute z-50 ${positionClasses[position][0]} left-1/2 -translate-x-1/2 mt-1
      opacity-0 group-hover:opacity-100 transition-opacity duration-300
      pointer-events-none
      bg-amber-800 text-amber-100 text-sm px-1 py-1 rounded shadow-lg whitespace-nowrap`}
    >
      {text}
      <span className={`absolute ${positionClasses[position][1]} left-1/2 -translate-x-1/2
        border-4 border-transparent ${positionClasses[position][2]}`}
      />
    </div>
  );
}

export default Tooltip;
