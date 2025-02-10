import { useEffect } from "react";
import DashBoard from "./pages/DashBoard.jsx";
import Login from "./components/Login";
import Navbar from "./components/Navbar.jsx";
import { useGlobalContext } from "./context/appContext.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProjectManagementDashboard from "./pages/ProjectManagementDashboard.jsx";
import AttendanceDetailsPage from "./pages/AttendanceDetailsPage.jsx";
import LeaveRequestPage from "./pages/LeaveRequestPage.jsx";
import DisplayLeaveRequests from "./pages/DisplayLeaveRequests.jsx";
import DisplayListOfProjects from "./pages/DisplayListOfProjects.jsx";
import ProjectTaksPage from "./pages/ProjectTaksPage.jsx";
import ListOfEmplyeesPage from "./pages/AdminPages/ListOfEmplyeesPage.jsx";
import ListOfTeamsPage from "./pages/AdminPages/ListOfTeamsPage.jsx";
import ListOfRolesPage from "./pages/AdminPages/ListOfRolesPage.jsx";
import ListOfHolidaysPage from "./pages/AdminPages/ListOfHolidaysPage.jsx";
import EmployeeProjectManagementDashboard from "./pages/EmployeeProjectManagementDashboard.jsx";
import MyTeamPage from "./pages/MyTeamPage.jsx";
import GetMailPage from "./pages/GetMailPage.jsx";
import UpdatePasswordPage from "./pages/UpdatePasswordPage.jsx";

function App() {
  const { jwtToken, role } = useGlobalContext();

  return (
    <div className="absolute bg-black min-h-svh">
      <div className="w-screen relative z-10">{jwtToken && <Navbar />}</div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!jwtToken ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              jwtToken ? (
                role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <DashBoard />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/projectManagement/dashdoard"
            element={
              jwtToken ? (
                role === "admin" ? (
                  <ProjectManagementDashboard />
                ) : (
                  <EmployeeProjectManagementDashboard />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/attendanceDetails"
            element={
              jwtToken ? <AttendanceDetailsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/leaveRequest"
            element={jwtToken ? <LeaveRequestPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/displayLeaveRequest"
            element={
              jwtToken && role === "admin" ? (
                <DisplayLeaveRequests />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/projectManagementDashboard"
            element={
              jwtToken ? (
                <ProjectManagementDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/listOfProjects/:status"
            element={
              jwtToken ? <DisplayListOfProjects /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/listOfProjects/managers/:name"
            element={
              jwtToken ? <DisplayListOfProjects /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/listOfTasks/:projectId"
            element={jwtToken ? <ProjectTaksPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/employees"
            element={
              jwtToken && role === "admin" ? (
                <ListOfEmplyeesPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/teams"
            element={
              jwtToken && role === "admin" ? (
                <ListOfTeamsPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/roles"
            element={
              jwtToken && role === "admin" ? (
                <ListOfRolesPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/holidays"
            element={
              jwtToken ? <ListOfHolidaysPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/myTeam"
            element={jwtToken ? <MyTeamPage /> : <Navigate to="/login" />}
          />
          <Route path="/getEmail" element={<GetMailPage />} />
          <Route path="/updatePassword" element={<UpdatePasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
