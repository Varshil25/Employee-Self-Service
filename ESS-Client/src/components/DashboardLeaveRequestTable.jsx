import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "from", label: "from (yyyy/mm/dd)", maxWidth: 100 },
  { id: "to", label: "to (yyyy/mm/dd)", maxWidth: 100 },
  { id: "days", label: "days", maxWidth: 100 },
  { id: "reason", label: "reason", maxWidth: 100 },
  //   { id: "type", label: "type", maxWidth: 100 },
  //   { id: "status", label: "status", maxWidth: 100 },
  //   { id: "options", label: "options", maxWidth: 100 },
];

export default function DashboardLeaveRequestTable({
  allPreviousLeaveRequests,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    let temp = [];
    for (let request in allPreviousLeaveRequests) {
      if (allPreviousLeaveRequests[request].status.toString() === "PENDING") {
        allPreviousLeaveRequests[request].options = true;
      } else {
        allPreviousLeaveRequests[request].options = false;
      }
      temp.push(allPreviousLeaveRequests[request]);
    }
    setRows(temp);
  }, [allPreviousLeaveRequests]);

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

  const handleEdit = (row) => {
    console.log("Updating: ", row);
  };

  const handleDelete = (row) => {
    console.log("Deleting: ", row);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "options" && value == true ? (
                            <>
                              <button
                                className="bg-blue-500/50 rounded-md p-1 cursor-pointer duration-300 hover:bg-blue-400/60"
                                onClick={() => handleEdit(row)}
                              >
                                edit
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
