import { useEffect, useState } from "react";
import { getXataClient } from "./xata";
import "./App.css";
import AssetList from "./components/AssetList";

export const xata = getXataClient();

const records = await xata.db.Assets.getAll();
console.log(records);
function App() {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await xata.db.Assets.getAll();
      setAssets(data);
    })();
  }, []);
  const assetsIn = assets.filter(
    (asset) => asset.status.toLowerCase() === "in"
  );
  const assetsOut = assets.filter(
    (asset) => asset.status.toLowerCase() === "out"
  );
  const assetsWatch = assets.filter(
    (asset) => asset.status.toLowerCase() === "watch"
  );
  return (
    <div className="index">
      <nav className="header">Hello Three</nav>
      <div className="board">
        <span>
          <h3>In</h3>
          <AssetList
            assets={assetsIn}
            allAssets={assets}
            status="In"
            createAsset={setAssets}
          />
        </span>
        <span>
          <h3>Watching</h3>
          <AssetList
            assets={assetsWatch}
            allAssets={assets}
            status="Watch"
            createAsset={setAssets}
          />
        </span>
        <span>
          <h3>Out</h3>
          <AssetList
            assets={assetsOut}
            allAssets={assets}
            status="Out"
            createAsset={setAssets}
          />
        </span>
      </div>
      <footer>and some bottom stuff</footer>
    </div>
  );
}

export default App;
