import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import BadgeIcon from "@mui/icons-material/Badge";

export const options = [
  {
    id: 1,
    text: "Dashboard",
    pathName: "/",
    icon: DashboardIcon,
    role: "any",
  },
  {
    id: 2,
    text: "Project dashboard",
    pathName: "/projectManagement/dashdoard",
    icon: AccountTreeIcon,
    role: "any",
  },
  {
    id: 3,
    text: "Attendace details",
    pathName: "/attendanceDetails",
    icon: CalendarMonthIcon,
    role: "any",
  },
  {
    id: 4,
    text: "Request leave",
    pathName: "/leaveRequest",
    icon: EditCalendarIcon,
    role: "any",
  },
  {
    id: 5,
    text: "My team",
    pathName: "/myTeam",
    icon: SupervisorAccountIcon,
    role: "any",
  },
  {
    id: 6,
    text: "Holidays",
    pathName: "/holidays",
    icon: CalendarMonthIcon,
    role: "any",
  },
  {
    id: 7,
    text: "Admin options",
    pathName: "",
    icon: ManageAccountsIcon,
    role: "admin",
  },
];

export const subOptions = [
  {
    id: 1,
    text: "Employees",
    pathName: "/employees",
    icon: PersonIcon,
    role: "admin",
  },
  {
    id: 2,
    text: "Teams",
    pathName: "/teams",
    icon: GroupsIcon,
    role: "admin",
  },
  {
    id: 3,
    text: "Roles",
    pathName: "/roles",
    icon: BadgeIcon,
    role: "admin",
  },
  {
    id: 4,
    text: "Holidays",
    pathName: "/holidays",
    icon: CalendarMonthIcon,
    role: "admin",
  },
];
