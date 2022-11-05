import { useEffect, useState } from "react";
import { getXataClient } from "./xata";
import "./App.css";
import AssetList from "./components/AssetList";

export const xata = getXataClient();

function App() {
  const [assets, setAssets] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await xata.db.Assets.getAll();
      setAssets(data);
    })();
  }, []);
  const handleCardSelect = (currentCardName) => {
    setSelectedCard(currentCardName);
  };
  const moveCard = (newStatus) => {
    try {
      const { id } = selectedCard;
      if (selectedCard) {
        xata.db.Assets.update({ id, status: newStatus }),
          setAssets((prevState) => [
            ...prevState.filter((asset) => asset.name !== selectedCard.name),
            { ...selectedCard, status: newStatus },
          ]);
        setSelectedCard(null);
      }
    } catch (e) {}
  };
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
      <nav className="header">FPL Assets</nav>
      <div className="board">
        <span>
          <h3>In</h3>
          <AssetList
            assets={assetsIn}
            allAssets={assets}
            status="In"
            updateAsset={setAssets}
            selectAssetCardOnClick={handleCardSelect}
            moveCard={moveCard}
          />
        </span>
        <span>
          <h3>Watching</h3>
          <AssetList
            assets={assetsWatch}
            allAssets={assets}
            status="Watch"
            selectAssetCardOnClick={handleCardSelect}
            updateAsset={setAssets}
            moveCard={moveCard}
          />
        </span>
        <span>
          <h3>Out</h3>
          <AssetList
            assets={assetsOut}
            allAssets={assets}
            status="Out"
            updateAsset={setAssets}
            selectAssetCardOnClick={handleCardSelect}
            moveCard={moveCard}
          />
        </span>
      </div>
      <footer>and some bottom stuff</footer>
    </div>
  );
}

export default App;
