import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Stack } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#308fe8" : "#1a90ff",
  },
  flex: true,
}));

const demo = {
  name: "Demo project",
  status: "NEW",
  manager: "Aditya Kaneriya",
  progress: "0%",
  createdOn: "2024-03-13T16:43:58.81827",
};

const columns = [
  { id: "name", label: "PROJECT", maxWidth: 50 },
  { id: "manager", label: "MANAGER", maxWidth: 50 },
  { id: "status", label: "STATUS", maxWidth: 50 },
  { id: "progress", label: "PROGRESS", minWidth: 200 },
  { id: "createdOn", label: "CREATED ON", maxWidth: 50 },
];

export default function ProjectTable({ projectsToDisplay }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    let temp = [];
    for (let project in projectsToDisplay) {
      temp.push(projectsToDisplay[project]);
    }
    setRows(temp);
  }, [projectsToDisplay]);

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

  const handleClick = (projectId) => {
    window.location = `/listOfTasks/${projectId}`;
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#1b1818",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{}}>
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
                          onClick={() => handleClick(row.id)}
                          className="cursor-pointer"
                          sx={{ color: "#a4a4a8" }}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "progress" ? (
                            <Stack
                              direction="row"
                              spacing={2}
                              className="items-center"
                            >
                              <CalendarTodayIcon
                                fontSize="small"
                                className="text-gray-800/80"
                                sx={{ color: "#a4a4a8" }}
                              />
                              <div className="w-[50%]">
                                <BorderLinearProgress
                                  variant="determinate"
                                  value={value}
                                />
                              </div>
                              <span>{value + "%"}</span>
                            </Stack>
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
        rowsPerPageOptions={[5, 10, 15]}
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
