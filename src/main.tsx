import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./redux/provider";
import App from "./App";
import "./styles/index.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Providers>
  </React.StrictMode>
);
