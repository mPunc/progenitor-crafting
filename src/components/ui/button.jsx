
function Button({text, onClick, color = "base"}) {
  const colorOptions = {
    base: "bg-amber-500 hover:bg-amber-300",
    green: "bg-green-500 hover:bg-green-100"
  };

  return (
    <button
      className={`text-black text-nowrap border border-black rounded-lg px-2 py-1 transition-colors ${colorOptions[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
