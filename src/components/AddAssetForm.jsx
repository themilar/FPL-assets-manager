import React from "react";
import { useState } from "react";
import { xata } from "../App";

function AddAssetForm({ status, show, onFormClick, updateAssets }) {
  const [name, setName] = useState("");
  //   const [status, setStatus] = useState(status);
  const [availability, setAvail] = useState("");
  const handleChange = (e) => setName(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    updateAssets({ name, availability, status });
    xata.db.Assets.create({ name, availability, status });
    onFormClick();
  };
  return (
    <div>
      <form
        action="post"
        onSubmit={handleSubmit}
        className={!show ? "hide" : "add-asset-form"}
      >
        Add Asset
        <input type="text" value={name} onChange={handleChange} />
        <input
          type="text"
          name="availability"
          value={availability}
          onChange={(e) => setAvail(e.target.value)}
        />
        <input type="submit" value="add player" />
      </form>
    </div>
  );
}

export default AddAssetForm;
