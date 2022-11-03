import { useEffect, useState } from "react";
import { getXataClient } from "./xata";
import "./App.css";
import AssetList from "./components/AssetList";

const xata = getXataClient();

// const records = await xata.db.Assets.getAll();
function App() {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await xata.db.Assets.getAll();
      setAssets(data);
    })();
  }, []);
  const assetsIn = assets.filter((asset) => asset.status === "in");
  const assetsOut = assets.filter((asset) => asset.status === "out");
  const assetsWatch = assets.filter((asset) => asset.status === "watching");
  return (
    <div className="index">
      <nav className="header">Hello Three</nav>
      <div className="board">
        <span>
          {/* <h3>In</h3> */}
          <AssetList assets={assetsIn} />
        </span>
        <span>
          <AssetList assets={assetsOut} />
        </span>
        <span>
          <AssetList assets={assetsWatch} />
        </span>
      </div>
      <footer>and some bottom stuff</footer>
    </div>
  );
}

export default App;
