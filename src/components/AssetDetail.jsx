import React, { useState } from "react";

function AssetDetail({ asset, deleteAsset }) {
  const [availability, setavailability] = useState([
    "fit",
    "injured",
    "suspended",
  ]);

  return (
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
      <i className="fa-solid fa-trash" onClick={() => deleteAsset(asset.id)} />
    </p>
  );
}

export default AssetDetail;
