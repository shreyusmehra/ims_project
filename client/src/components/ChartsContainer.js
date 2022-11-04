import { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyProducts: data } = useAppContext();

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: "easeIn", duration: 1, delay: 1 }}
    >
      <Card
        sx={{ minWidth: 275, maxWidth: 1000 }}
        style={{
          margin: "30px auto",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Monthly Products
          </Typography>
          {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setBarChart(!barChart)}>
            {barChart ? "Area Chart" : "Bar Chart"}
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};
export default ChartsContainer;
