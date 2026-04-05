
function Footer() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col justify-center items-center pt-3 pb-3">
      <div className="underline self-start">This is the crafting calculator for you if:</div>
      <ul className="list-disc mb-2">
        <li>you got tired of using the desktop or a physical calculator</li>
        <li>you hate excel</li>
        <li>you think online calculators seem inaccurate, slow, and don't tell you all the details</li>
      </ul>
      <p className="text-base">
        Made, used and tested by an active player.
        Works completely offline.
        The data that other calculators pull from their databases are often NOT accurate
        and are NOT updated in real time so that's why I decided to make a calc
        that takes more inputs, but is 100% accurate for those inputs.
        You are free to use the est. market value or other tools to get your prices :)
      </p>
      <div className="italic text-amber-300">-Progenitor (EU server)</div>
    </div>
  );
}

export default Footer;
