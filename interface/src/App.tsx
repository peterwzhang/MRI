import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "react-intl";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routing from "./pages/routing";
import "./styles/globals.css";

const router = createBrowserRouter(routing);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <CssBaseline />
        <RouterProvider router={router} />
      </IntlProvider>
    </QueryClientProvider>
  );
}
