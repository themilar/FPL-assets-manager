import { useEffect, useState } from "react";
import { getXataClient } from "./xata";
import "./App.css";
import AssetList from "./components/AssetList";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CLOUD_NAME } from "./.secrets";
export const xata = getXataClient();

function App() {
  const [assets, setAssets] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD_NAME,
    },
  });
  const Image = cld
    .image("FPL-2223-EDITORIAL-STATEMENT_2_kd8sgw.png")
    .resize(fill().width(200).height(50));
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
      <header className="header">
        <span>
          <AdvancedImage cldImg={Image} />
        </span>
        <span>
          <h2>Assets</h2>
        </span>
      </header>
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
      <footer>Submitted by</footer>
    </div>
  );
}

export default App;
