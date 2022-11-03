import { useEffect, useState } from "react";
import { getXataClient } from "./xata";
import "./App.css";

const xata = getXataClient();

const records = await xata.db.Assets.getAll();
function App() {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await xata.db.Assets.getAll();
      setAssets(data);
    })();
  }, []);
  return (
    <div className="index">
      <nav className="header">Hello Three</nav>
      <div className="board">
        <span>
          {/* <h3>In</h3> */}
          <div className="assets">
            {records.map((asset) => (
              <p className="asset-card" key={asset.id}>
                <span>{asset.name}</span>
                <select name="availability" id="" className="avail-selector">
                  <option value={asset}>fit</option>
                  {assets.map(
                    (asset) =>
                      asset.availability && (
                        <option value={asset.id} key={asset.id}>
                          {asset.availability}
                        </option>
                      )
                  )}
                </select>
              </p>
            ))}
          </div>
        </span>

        <div className="assets"></div>
        <div className="assets"></div>
      </div>
      <footer>and some bottom stuff</footer>
    </div>
  );
}

export default App;
