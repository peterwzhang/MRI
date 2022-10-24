import AccountInfo from "./Account";
import CreateBatch from "./batch/Create";
import ViewBatch from "./batch/View";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import ViewJob from "./job/View";
import ScriptCreationForm from "./script/ScriptCreationForm";
import ScriptEditForm from "./script/ScriptEditForm";
import ScriptLibrary from "./script/ScriptLibrary";
import ScriptView from "./script/ScriptView";
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
    path: "/scripts",
    element: withNavbar(<ScriptLibrary />),
  },
  // supporting just so people can manually edit URL and not be lost
  // /scripts/ is preferred for the library, /script/ for individual
  {
    path: "/script",
    element: withNavbar(<ScriptLibrary />),
  },
  {
    path: "/script/:scriptId",
    element: withNavbar(<ScriptView />),
  },
  {
    path: "/script/:scriptId/edit",
    element: withNavbar(<ScriptEditForm />),
  },
  {
    path: "/script/new",
    element: withNavbar(<ScriptCreationForm />),
  },
];
