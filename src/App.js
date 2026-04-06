import { useState } from "react";
import Header from "./components/appComponents/header";
import Footer from "./components/appComponents/footer";
import MainContainer from "./components/appComponents/mainContainer";

function App() {
  const [itemCount, setItemCount] = useState(0);

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-amber-500 font-barlow">
      <Header className={itemCount > 0 ? "-translate-y-full" : "translate-y-0"}/>
      <MainContainer className={itemCount > 0 ? "-translate-y-[12%]" : "translate-y-0"}
        onItemsChange={(x) => setItemCount(x)}
      />
      <Footer className={itemCount > 0 ? "translate-y-full" : "translate-y-0"}/>
    </div>
  );
}

export default App;
