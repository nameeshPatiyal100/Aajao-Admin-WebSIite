// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import App from "./App.tsx";
//import { AuthProvider } from "./context/AuthContext.tsx";
// import AppWrapper from "./appWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    {/* <AuthProvider> */}
    {/* <AppWrapper> */}
    <App />
    {/* </AppWrapper> */}
    {/* </AuthProvider> */}
  </Provider>
  // </StrictMode>
);
