import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Grid } from "@mui/material";
import "./index.css";
import Header from "../Header/Header";
import CheckingAccount from "../Chart/CheckingAccount/CheckingAccount";
import Invoice from "../Chart/InvoiceSection/Invoice";
import Account from "../Chart/AccountSection/Account";
import TotalCash from "../Chart/TotalCashSection/TotalCash";
import {
  createData,
  initialInvoiceData,
  initialTotalData,
} from "../../utils/Constants";
import SideBar from "../SideBar/SideBar";

const rows = [
  createData("Sales", 159, 6.0),
  createData("Advertising", 237, 9.0),
  createData("Inventory", 262, 16.0),
  createData("Entertainment", 305, 3.7),
  createData("Product", 356, 16.0),
];

function randomizeData() {
  return {
    chart1: Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)),
    chart2: initialInvoiceData.map((item) => ({
      label: item.label,
      value: Math.floor(Math.random() * 100),
    })),
    chart3: initialTotalData.map((item) => ({
      label: item.label,
      inValue: Math.floor(Math.random() * 100),
      outValue: Math.floor(Math.random() * 100),
    })),
    chart4: rows.map((item) => createData(item.name)), // Generate random data for chart4 using the createData function
  };
}

export const ContextData = React.createContext();

export default function Index() {
  const [chartData, setChartData] = React.useState(randomizeData());

  const handleClick = () => {
    setChartData(randomizeData());
  };

  return (
    <ContextData.Provider value={{ chartData, setChartData }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header handleClick={handleClick} />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "lightgrey", p: 3 }}>
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CheckingAccount />
            </Grid>
            <Grid item xs={6}>
              <Invoice />
            </Grid>
            <Grid item xs={6}>
              <TotalCash />
            </Grid>
            <Grid item xs={6}>
              <Account />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ContextData.Provider>
  );
}
