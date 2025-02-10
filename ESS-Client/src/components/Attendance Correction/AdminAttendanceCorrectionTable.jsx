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
import AddNoteModal from "./AddNoteModal";

const columns = [
  { id: "date", label: "date (yyyy/mm/dd)", maxWidth: 100 },
  { id: "employeeName", label: "employee name", maxWidth: 100 },
  { id: "remark", label: "remark", maxWidth: 100 },
  { id: "status", label: "status", maxWidth: 100 },
  { id: "options", label: "options", maxWidth: 100 },
];

export default function AdminAttendanceCorrectionTable() {
  const { authFetch, role, team } = useGlobalContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [option, setOption] = React.useState("");
  const [correctionToPass, setCorrectionToPass] = React.useState({});

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [listOfAllEmployees, setListOfAllEmployees] = React.useState([]);
  const [listOfCorrectionRequest, setListOfCorrectionRequest] = React.useState(
    []
  );
  React.useEffect(() => {
    authFetch
      .get(`/employee/all`)
      .then((res) => {
        setListOfAllEmployees(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    const sameTeam = listOfAllEmployees?.filter(
      (employee) => employee?.team?.name?.toLowerCase() === team
    );
    sameTeam?.forEach((employee) => {
      employee.corrections.forEach((correction) => {
        correction.employeeId = employee.id;
        correction.employeeName = employee.firstName + " " + employee.lastName;
        if (correction.status !== "APPROVED") {
          correction.options = true;
        }
        setListOfCorrectionRequest((prev) => [...prev, correction]);
      });
    });
  }, [listOfAllEmployees, team]);

  React.useEffect(() => {
    console.log("list:", listOfCorrectionRequest);
    setRows(listOfCorrectionRequest);
  }, [listOfCorrectionRequest]);

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

  const handleApprove = (correction) => {
    setOption("approve");
    handleOpen();
    setCorrectionToPass(correction);
  };

  const handleReject = (correction) => {
    setOption("reject");
    handleOpen();
    setCorrectionToPass(correction);
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", backgroundColor: "#1b1818" }}
    >
      <AddNoteModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={isOpen}
        setOpen={setIsOpen}
        option={option}
        correction={correctionToPass}
        setIsChanged
      />
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
                          ) : column.id === "options" && value == true ? (
                            <>
                              <button
                                className="bg-green-500/50 rounded-md p-1 cursor-pointer duration-300 hover:bg-green-400/60"
                                onClick={() => handleApprove(row)}
                              >
                                approve
                              </button>{" "}
                              <button
                                className="bg-red-500/60 rounded-md p-1 cursor-pointer duration-300 hover:bg-red-400/60"
                                onClick={() => handleReject(row)}
                              >
                                reject
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
