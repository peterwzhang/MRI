import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "react-intl";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routing from "./pages/routing";
import "./styles/globals.css";

const router = createBrowserRouter(routing);

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#9e1b32",
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
}
