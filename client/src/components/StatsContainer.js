import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import LuggageIcon from "@mui/icons-material/Luggage";
import CheckIcon from "@mui/icons-material/Check";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "available",
      count: stats.available || 0,
      icon: <CheckIcon />,
      color: "#647acb",
      bcg: "#e0e8f9",
      position: -1000,
    },
    {
      title: "unavailable",
      count: stats.unavailable || 0,
      icon: <LuggageIcon />,
      color: "#e9b949",
      bcg: "#fcefc7",
      position: 1000,
    },
  ];

  return (
    <div
      style={{
        margin: "100px 0px 0px 0px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </div>
  );
};
export default StatsContainer;
