import { useAppContext } from "../context/appContext";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    categoryOptions,
    statusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <FormControl
      style={{
        margin: "100px 0px 20px 10px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <motion.div
        animate={{ x: [-500, 0], opacity: 1 }}
        transition={{
          delay: 1,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Inventory ..."
            name="search"
            value={search}
            onChange={handleSearch}
            inputProps={{ "aria-label": "search game name" }}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </motion.div>
      {/* search by status */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: "easeIn", duration: 1, delay: 1 }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
          size="small"
        >
          <InputLabel id="select-status">Status</InputLabel>
          <Select
            value={searchStatus}
            label="searchStatus"
            name="searchStatus"
            onChange={handleSearch}
          >
            {["all", ...statusOptions].map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  style={{ textTransform: "capitalize" }}
                  key={index}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* search by category */}
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
          size="small"
        >
          <InputLabel id="select-category">Category</InputLabel>
          <Select
            value={searchType}
            label="searchType"
            name="searchType"
            onChange={handleSearch}
          >
            {["all", ...categoryOptions].map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  style={{ textTransform: "capitalize" }}
                  key={index}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* sort */}
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
          size="small"
        >
          <InputLabel id="sort">Sort</InputLabel>
          <Select value={sort} label="sort" name="sort" onChange={handleSearch}>
            {sortOptions.map((item, index) => {
              return (
                <MenuItem
                  value={item}
                  style={{ textTransform: "capitalize" }}
                  key={index}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </motion.div>
      <motion.div
        animate={{ x: [500, 0], opacity: 1 }}
        transition={{
          delay: 1,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          Clear Filters
        </Button>
      </motion.div>
    </FormControl>
  );
};
export default SearchContainer;
