
function Tooltip({ text }) {
  return (
    <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1
      opacity-0 group-hover:opacity-100 transition-opacity duration-300
      pointer-events-none
      bg-amber-800 text-amber-100 text-sm px-1 py-1 rounded shadow-lg whitespace-nowrap"
    >
      {text}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2
        border-4 border-transparent border-b-amber-800"
      />
    </div>
  );
}

export default Tooltip;
