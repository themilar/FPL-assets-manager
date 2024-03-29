import React, { useState } from "react";
import { xata } from "../App";

function AssetDetail({ asset, deleteAsset, onClick }) {
  const optionsAvailable = ["fit", "injured", "suspended"];
  const [availability, setAvailability] = useState(asset.availability);
  const { id } = asset;
  const handleChange = (e) => {
    let availability = e.target.value;
    xata.db.Assets.update({ availability, id });
    setAvailability(availability);
  };
  return (
    <p className="asset-card" key={asset.id} onClick={() => onClick(asset)}>
      <span>{asset.name}</span>{" "}
      <select
        name="availability"
        onChange={handleChange}
        className={`avail-selector ${availability}`}
      >
        <option value={asset.availability}>{asset.availability}</option>
        {optionsAvailable.map(
          (option) =>
            option != asset.availability && (
              <option value={option} key={option}>
                {option}
              </option>
            )
        )}
      </select>
      <i
        className="fa-solid fa-trash"
        onClick={(e) => {
          deleteAsset(asset.name, asset.id);
          e.stopPropagation();
        }}
      />
    </p>
  );
}

export default AssetDetail;
