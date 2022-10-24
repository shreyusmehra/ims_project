import { useAppContext } from "../context/appContext";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Button } from "@mui/material";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  //   const pages = Array.from({ length: numOfPages }, (_, index) => {
  //     return index + 1;
  //   });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="standard" onClick={prevPage}>
        <NavigateBeforeIcon />
        prev
      </Button>
      <div style={{ fontWeight: "bold" }}>{page}</div>
      <Button variant="standard" onClick={nextPage}>
        next
        <NavigateNextIcon />
      </Button>
    </div>
  );
};

export default PageBtnContainer;
