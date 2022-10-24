import { useAppContext } from "../context/appContext";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  return (
    <div
      style={{
        margin: "100px 0px 20px 10px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        name="search"
        value={search}
        onChange={handleSearch}
      />
      {/* search by status */}
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
      <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
        Clear Filters
      </Button>
    </div>
  );
};
export default SearchContainer;
