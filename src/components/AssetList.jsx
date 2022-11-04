import { useState } from "react";
import { xata } from "../App";

import AddAssetForm from "./AddAssetForm";
import AssetDetail from "./AssetDetail";

export default function AssetList({ assets, status, updateAsset, allAssets }) {
  const [showForm, setShowForm] = useState(false);
  const updateAssetsDisplayed = (newAsset) => {
    updateAsset(allAssets.concat(newAsset));
  };
  const handleClick = () => {
    setShowForm(!showForm);
  };
  const deleteAsset = (assetName, assetID) => {
    xata.db.Assets.delete(assetID);
    updateAsset(allAssets.filter((asset) => asset.name !== assetName));
  };
  return (
    <div className="assets">
      {assets.map((asset) => (
        <AssetDetail
          asset={asset}
          allAssets={allAssets}
          deleteAsset={deleteAsset}
        />
      ))}
      {assets.length < 11 ? (
        <>
          <AddAssetForm
            status={status}
            show={showForm}
            onFormClick={handleClick}
            updateAssets={updateAssetsDisplayed}
          />
          <i className="fa-regular fa-plus" onClick={handleClick} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
