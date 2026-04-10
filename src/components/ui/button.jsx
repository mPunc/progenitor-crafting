
function Button({text, onClick, color = "base"}) {
  const colorOptions = {
    base: "bg-amber-500 hover:bg-amber-300",
    green: "bg-green-500 hover:bg-green-100",
    red: "bg-red-500 hover:bg-red-300"
  };

  return (
    <button
      className={`text-black text-nowrap font-medium border border-black rounded-lg px-2 py-1 transition-colors ${colorOptions[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
