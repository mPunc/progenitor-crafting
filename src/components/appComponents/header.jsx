import HorizontalLine from "../ui/horizontalLine";

function Header({ className }) {
  return (
    <div className={`flex flex-col justify-center items-center pt-3
      transition-transform duration-500 ease-out ${className}`}
    >
      <h1 className="text-3xl font-bold">Progenitor's no-bullshit craft calculator (Albion Online)</h1>
      <p className="text-base italic">v1.1 beta</p>
      <HorizontalLine/>
    </div>
  );
}

export default Header;
