import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Inventory from "./Inventory";

const InventoryContainer = () => {
  const {
    getInventory,
    inventory,
    isLoading,
    page,
    totalInventory,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getInventory();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (inventory.length === 0) {
    return (
      <div>
        <h2>No jobs to display...</h2>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        {totalInventory} product{inventory.length > 1 && "s"} found
      </Typography>
      <div
        style={{
          margin: "20px 0px 0px 0px",
          display: "flex",
          display: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {inventory.map((item) => {
          return <Inventory key={item._id} {...item} />;
        })}
      </div>
      <div style={{ textAlign: "center", margin: "20px 0px 20px 0px" }}>
        {numOfPages > 1 && <PageBtnContainer />}
      </div>
    </div>
  );
};
export default InventoryContainer;
