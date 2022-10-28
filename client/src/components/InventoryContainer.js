import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Inventory from "./Inventory";
import { Typography } from "@mui/material";
import PageBtnContainer from "./PageBtnContainer";
import Loading from "./Loading";
import { motion } from "framer-motion";

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

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

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
      <motion.div
        animate={{ x: [-1000, 0], opacity: 1 }}
        transition={{
          delay: 1,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          No jobs to display...
        </Typography>
      </motion.div>
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
      <motion.div
        animate={{ x: [-1000, 0], opacity: 1 }}
        transition={{
          delay: 1,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <Typography variant="h5">
          {totalInventory} product{inventory.length > 1 && "s"} found
        </Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: "easeIn", duration: 1, delay: 1 }}
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
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        style={{ textAlign: "center", margin: "20px 0px 20px 0px" }}
      >
        {numOfPages > 1 && <PageBtnContainer />}
      </motion.div>
    </div>
  );
};
export default InventoryContainer;
