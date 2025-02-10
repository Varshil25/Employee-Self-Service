import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useGlobalContext } from "../../context/appContext";

const columns = [
  { id: "name", label: "Name", maxWidth: 100 },
  { id: "team", label: "Team", maxWidth: 100 },
  { id: "email", label: "Email", maxWidth: 100 },
  { id: "role", label: "Role", maxWidth: 100 },
];

const managerColumns = [
  { id: "name", label: "Name", maxWidth: 100 },
  { id: "team", label: "Team", maxWidth: 100 },
  { id: "email", label: "Email", maxWidth: 100 },
  { id: "role", label: "Role", maxWidth: 100 },
  {
    id: "monthlyNetMinutes",
    label: "Net hours",
    maxWidth: 100,
  },
  {
    id: "totalActiveDays",
    label: "Active days",
    maxWidth: 100,
  },
  {
    id: "averageWorkMinutes",
    label: "Avg. hours",
    maxWidth: 100,
  },
];

export default function MyTeamEmployeesTable({ listOfEmployees }) {
  const { authFetch, role } = useGlobalContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    console.log(listOfEmployees);
    let temp = [];
    for (let employee in listOfEmployees) {
      //   console.log(listOfEmployees[employee]);
      temp.push(listOfEmployees[employee]);
    }
    setRows(temp);
  }, [listOfEmployees]);

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

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", backgroundColor: "#1b1818" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {role.toLowerCase() == "manager" || role.toLowerCase() == "admin"
                ? managerColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sx={{ backgroundColor: "#1b1818", color: "#a4a4a8" }}
                    >
                      {column.label}
                    </TableCell>
                  ))
                : columns.map((column) => (
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
                  <TableRow tabIndex={-1} key={row.id}>
                    {role.toLowerCase() == "manager" ||
                    role.toLowerCase() == "admin"
                      ? managerColumns.map((column) => {
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
                        })
                      : columns.map((column) => {
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
        sx={{ color: "#a4a4a8" }}
      />
    </Paper>
  );
}
