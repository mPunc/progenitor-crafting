
function Tooltip({ text }) {
  return (
    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      pointer-events-none
      bg-amber-800 text-amber-100 text-sm
      px-2 py-1 rounded whitespace-nowrap"
    >
      {text}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2
        border-4 border-transparent
        border-b-amber-800"
      />
    </span>
  );
}

export default Tooltip;
