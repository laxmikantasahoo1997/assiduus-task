import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Typography, Box } from "@mui/material";
import "./account.css";
import { ContextData } from "../../Index/Index";

export default function Account() {
  const { chartData } = React.useContext(ContextData);
  return (
    <Paper elevation={5} sx={{ padding: "10px" }}>
      <Box display={"flex"} justifyContent={"flex-start"}>
        <Typography variant="h6">Account watchlist</Typography>
      </Box>
      <Divider />
      <TableContainer>
        <Table className="table__container">
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell align="right">This Month</TableCell>
              <TableCell align="right">YTD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData?.chart4.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="reduced-height-cell"
                >
                  {row.name}
                </TableCell>
                <TableCell align="right" className="reduced-height-cell">
                  {row.calories}
                </TableCell>
                <TableCell align="right" className="reduced-height-cell">
                  {row.fat}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
