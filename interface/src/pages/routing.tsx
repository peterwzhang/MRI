import AccountInfo from "./Account";
import CreateBatch from "./batch/Create";
import ViewBatch from "./batch/View";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import ScriptLibrary from "./ScriptLibrary";
import ViewJob from "./job/View";
import withNavbar from "./withNavbar";

export default [
  {
    path: "/",
    element: withNavbar(<Homepage />),
  },
  {
    path: "/account",
    element: withNavbar(<AccountInfo />),
  },
  {
    path: "/dashboard",
    element: withNavbar(<Dashboard />),
  },
  {
    path: "/batch/:batchId",
    element: withNavbar(<ViewBatch />),
  },
  {
    path: "/batch/:batchId/job/:jobId",
    element: withNavbar(<ViewJob />),
  },
  {
    path: "/batch/create",
    element: withNavbar(<CreateBatch />),
  },
  {
    path: "/script-library",
    element: withNavbar(<ScriptLibrary />),
  },
];
