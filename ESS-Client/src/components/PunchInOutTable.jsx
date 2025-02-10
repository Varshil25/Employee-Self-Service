import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { split } from "postcss/lib/list";

const columns = [
  { id: "date", label: "date(yyyy/mm/dd)", minWidth: 170 },
  { id: "time", label: "time", minWidth: 100 },
  {
    id: "I/Ooperation",
    label: "I/O operation",
    minWidth: 170,
  },
];

export default function PunchInOutTable({ todaysPunches = [] }) {
  //   console.log("Tables: ", todaysPunches);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    let temp = [];
    for (let punch in todaysPunches) {
      todaysPunches[punch].punchIn
        ? (todaysPunches[punch]["I/Ooperation"] = "Punch In")
        : (todaysPunches[punch]["I/Ooperation"] = "Punch Out");
      const splitted = todaysPunches[punch]?.time?.split(":");
      todaysPunches[punch].time = splitted[0] + ":" + splitted[1];
      temp.push(todaysPunches[punch]);
    }
    setRows(temp);
  }, [todaysPunches]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", backgroundColor: "#1b1818" }}
      className="relative"
    >
      <TableContainer sx={{ maxHeight: 440 }} className="min-h-[450px]">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ backgroundColor: "#1b1818", color: "#a4a4a8" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={Math.random()}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ color: "#a4a4a8" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="relative bottom-0"
        sx={{ color: "#a4a4a8" }}
      />
    </Paper>
  );
}
