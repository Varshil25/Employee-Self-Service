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
  { id: "name", label: "Name", maxWidth: 100 },
  { id: "projectName", label: "Project", maxWidth: 100 },
  { id: "assignBy", label: "Assigned By", maxWidth: 100 },
  { id: "status", label: "Status", maxWidth: 100 },
  { id: "priority", label: "Priority", maxWidth: 100 },
];

export default function ListOfTasksAssignTomeTable({ listOfTasks }) {
  const { authFetch } = useGlobalContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    // console.log(listOfTasks);
    let temp = [];
    for (let task in listOfTasks) {
      // console.log(listOfTasks[task]);
      temp.push(listOfTasks[task]);
    }
    setRows(temp);
  }, [listOfTasks]);

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

  const handleClick = (row) => {
    window.location = `/listOfTasks/${row.projectId}`;
  };

  const handleUpdate = (task) => {};

  const handleDelete = (task) => {};

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
                  <TableRow
                    tabIndex={-1}
                    key={row.id}
                    className="cursor-pointer"
                    onClick={() => handleClick(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ color: "#a4a4a8" }}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "options" ? (
                            <>
                              <button
                                className="bg-green-500/50 rounded-md p-1 cursor-pointer duration-300 hover:bg-green-400/60"
                                onClick={() => handleUpdate(row)}
                              >
                                update
                              </button>{" "}
                              <button
                                className="bg-red-500/60 rounded-md p-1 cursor-pointer duration-300 hover:bg-red-400/60"
                                onClick={() => handleDelete(row)}
                              >
                                delete
                              </button>
                            </>
                          ) : (
                            value
                          )}
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
        rowsPerPageOptions={[3, 10, 25, 100]}
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
