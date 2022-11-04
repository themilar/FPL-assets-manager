import { useEffect, useState } from "react";
import { getXataClient } from "./xata";
import "./App.css";
import AssetList from "./components/AssetList";

export const xata = getXataClient();

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
          <h3>In</h3>
          <AssetList assets={assetsIn} status="In" />
        </span>
        <span>
          <h3>Watching</h3>
          <AssetList assets={assetsWatch} status="Out" />
        </span>
        <span>
          <h3>Out</h3>
          <AssetList assets={assetsOut} status="Watch" />
        </span>
      </div>
      <footer>and some bottom stuff</footer>
    </div>
  );
}

export default App;
