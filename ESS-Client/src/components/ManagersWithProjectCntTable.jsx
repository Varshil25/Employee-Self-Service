import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGlobalContext } from "../context/appContext";

const columns = [
  { label: "NAME", id: "name", maxWidth: 100 },
  { label: "NEW", id: "newCnt", maxWidth: 100 },
  { label: "IN PROGRESS", id: "inProgressCnt", maxWidth: 100 },
  { label: "ON HOLD", id: "onholdCnt", maxWidth: 100 },
  { label: "COMPLETED", id: "completedCnt", maxWidth: 100 },
  { label: "CANCELED", id: "canceledCnt", maxWidth: 100 },
  { label: "TOTAL", id: "totalProjCnt", maxWidth: 100 },
];

export default function ManagersWithProjectCntTable({ membersWithProjectCnt }) {
  const { authFetch } = useGlobalContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    // console.log("From table", membersWithProjectCnt);
    let temp = [];
    for (let member in membersWithProjectCnt) {
      temp.push(membersWithProjectCnt[member]);
    }
    setRows(temp);
  }, [membersWithProjectCnt]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDateChange = (key) => {
    setCurrentDate(key.date);
  };

  const handleClick = (name) => {
    window.location = `/listOfProjects/managers/${name}`;
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", backgroundColor: "#1b1818" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
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
                  <TableRow tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => handleClick(row.name)}
                          className="cursor-pointer"
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
        sx={{ color: "#a4a4a8" }}
      />
    </Paper>
  );
}
