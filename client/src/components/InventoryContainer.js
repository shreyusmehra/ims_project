import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Inventory from "./Inventory";
import { Typography } from "@mui/material";
import PageBtnContainer from "./PageBtnContainer";
import Loading from "./Loading";

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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <div>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          No jobs to display...
        </Typography>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">
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
