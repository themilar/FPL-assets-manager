import { useState } from "react";
import AddAssetForm from "./AddAssetForm";

export default function AssetList({ assets, status, createAsset, allAssets }) {
  const [availability, setavailability] = useState([
    "fit",
    "injured",
    "suspended",
  ]);
  const [showForm, setShowForm] = useState(false);
  const updateAssets = (newAsset) => {
    createAsset([...allAssets, newAsset]);
  };
  const handleClick = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="assets">
      {assets.map((asset) => (
        <p className="asset-card" key={asset.id}>
          <span>{asset.name}</span>{" "}
          <select name="availability" id="" className="avail-selector">
            <option value={asset.id}>{asset.availability}</option>
            {availability.map(
              (option) =>
                option != asset.availability && (
                  <option value={option} key={option}>
                    {option}
                  </option>
                )
            )}
          </select>
          <i className="fa-solid fa-trash"></i>
        </p>
      ))}
      {assets.length < 11 ? (
        <>
          <AddAssetForm
            status={status}
            show={showForm}
            onFormClick={handleClick}
            updateAssets={updateAssets}
          />
          <i className="fa-regular fa-plus" onClick={handleClick} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
