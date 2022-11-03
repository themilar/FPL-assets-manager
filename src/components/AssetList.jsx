export default function AssetList({ assets }) {
  const handleClick = () => {};
  return (
    <div className="assets">
      {assets.map((asset) => (
        <p className="asset-card" key={asset.id}>
          <span>{asset.name}</span>{" "}
          <select name="availability" id="" className="avail-selector">
            {assets.map(
              (asset) =>
                asset.availability && (
                  <option value={asset.id} key={asset.id}>
                    {asset.availability}
                  </option>
                )
            )}
          </select>
          <i class="fa-solid fa-trash"></i>
        </p>
      ))}
      {assets.length < 11 ? (
        <i class="fa-regular fa-plus" onClick={handleClick} />
      ) : (
        ""
      )}
    </div>
  );
}
