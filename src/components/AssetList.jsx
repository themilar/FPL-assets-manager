import { useState } from "react";
import AddAssetForm from "./AddAssetForm";

export default function AssetList({ assets, status }) {
  const [availability, setavailability] = useState([
    "fit",
    "injured",
    "suspended",
  ]);
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="assets">
      {assets.map((asset) => (
        <p className="asset-card" key={asset.id}>
          <span>{asset.name}</span>{" "}
          <select name="availability" id="" className="avail-selector">
            {assets.map((asset) => (
              <option value={asset.id} key={asset.id}>
                {asset.availability}
              </option>
            ))}
          </select>
          <i class="fa-solid fa-trash"></i>
        </p>
      ))}
      {assets.length < 11 ? (
        <>
          <AddAssetForm
            status={status}
            show={showForm}
            onFormClick={handleClick}
          />
          <i className="fa-regular fa-plus" onClick={handleClick} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
