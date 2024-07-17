import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes/router.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { SearchProvider } from "./contexts/SearchContext.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </AuthContextProvider>
);