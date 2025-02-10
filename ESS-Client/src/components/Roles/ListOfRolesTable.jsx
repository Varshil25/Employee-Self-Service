import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useGlobalContext } from "../../context/appContext";

const columns = [
  { id: "name", label: "Name", maxWidth: 100 },
  { id: "employees", label: "Employees", maxWidth: 100 },
  { id: "options", label: "Options", maxWidth: 100 },
];

export default function ListOfRolesTable({
  listOfRoles,
  setIsChanged,
  setCurrentRole,
  handleOpen,
}) {
  const { authFetch, displayAlert } = useGlobalContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    let temp = [];
    for (let role in listOfRoles) {
      console.log(listOfRoles[role]);
      temp.push(listOfRoles[role]);
    }
    setRows(temp);
  }, [listOfRoles]);

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

  const handleUpdate = (role) => {
    setCurrentRole(role);
    handleOpen();
  };

  const handleDelete = (role) => {
    authFetch
      .delete(`/role/${role.id}`)
      .then((res) => {
        displayAlert(res.data.name + " role deleted successfully", "success");
        setIsChanged((prev) => !prev);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          displayAlert(err?.response?.data?.message, "error");
        } else {
          displayAlert("something sent wrong", "error");
        }
        console.log(err);
      });
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
                  <TableRow tabIndex={-1} key={row.id}>
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
                                <BorderColorIcon fontSize="small" />
                              </button>{" "}
                              <button
                                className="bg-red-500/60 rounded-md p-1 cursor-pointer duration-300 hover:bg-red-400/60"
                                onClick={() => handleDelete(row)}
                              >
                                <DeleteOutlineIcon fontSize="small" />
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
