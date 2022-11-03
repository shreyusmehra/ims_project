import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import StatsContainer from "../components/StatsContainer";
import Loading from "../components/Loading";

const Stats = () => {
  const { showStats, isLoading, monthlyProducts } = useAppContext();

  useEffect(() => {
    showStats();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "100px 0px 0px 0px",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <StatsContainer />
      {monthlyProducts.length > 0}
    </>
  );
};

export default Stats;
