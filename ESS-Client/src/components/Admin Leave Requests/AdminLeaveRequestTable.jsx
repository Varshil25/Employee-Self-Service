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
  { id: "from", label: "from (yyyy/mm/dd)", maxWidth: 100 },
  { id: "to", label: "to (yyyy/mm/dd)", maxWidth: 100 },
  { id: "reason", label: "reason", maxWidth: 100 },
  { id: "days", label: "days", maxWidth: 100 },
  { id: "type", label: "type", maxWidth: 100 },
  { id: "status", label: "status", maxWidth: 100 },
  { id: "employee name", label: "employee name", maxWidth: 100 },
  { id: "options", label: "options", maxWidth: 100 },
];

export default function AdminLeaveRequestTable({
  allPreviousLeaveRequests,
  setIsChanged,
}) {
  const { authFetch } = useGlobalContext();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  const [listOfAllEmployees, setListOfAllEmployees] = React.useState([]);
  const [mapOfEmployeeAndLeaveRequest, setMapOfEmployeeAndLeaveRequest] =
    React.useState(new Map());
  const [mapOfRequestAndEmployeeId, setMapOfRequestAndEmployeeId] =
    React.useState(new Map());
  const [isOpen, setIsOpen] = React.useState(false);
  const [option, setOption] = React.useState("");
  const [leaveToPass, setLeaveToPass] = React.useState({});

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    authFetch
      .get(`/employee/all`)
      .then((res) => {
        setListOfAllEmployees(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    let map = new Map();
    let mapOfIds = new Map();
    listOfAllEmployees.forEach((employee) =>
      employee.leaves.forEach((leave) => {
        map.set(
          leave.id,
          employee.firstName.toString() + " " + employee.lastName.toString()
        );
        mapOfIds.set(leave.id, employee.id);
      })
    );
    setMapOfEmployeeAndLeaveRequest(map);
    setMapOfRequestAndEmployeeId(mapOfIds);
  }, [listOfAllEmployees]);

  const addEmployeeInfo = () => {
    allPreviousLeaveRequests.forEach((leaveRequest) => {
      leaveRequest["employee name"] = mapOfEmployeeAndLeaveRequest.get(
        leaveRequest.id
      );
      leaveRequest["requestEmployeeId"] = mapOfRequestAndEmployeeId.get(
        leaveRequest.id
      );
    });
  };

  React.useEffect(() => {
    addEmployeeInfo();
    // console.log("allPrev: ", allPreviousLeaveRequests);
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
  }, [mapOfEmployeeAndLeaveRequest, allPreviousLeaveRequests]);

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

  const handleApprove = (leave) => {
    setOption("approve");
    handleOpen();
    setLeaveToPass(leave);
    // leave.status = "APPROVED";
    // authFetch
    //   .put(`/leave/${leave.id}`, leave)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err.data));
  };

  const handleReject = (leave) => {
    setOption("reject");
    handleOpen();
    setLeaveToPass(leave);
    // leave.status = "REJECTED";
    // authFetch
    //   .put(`/leave/${leave.id}`, leave)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err.data));
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
        leave={leaveToPass}
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
