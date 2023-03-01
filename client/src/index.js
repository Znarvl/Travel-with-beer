import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider} from "@auth0/auth0-react"
import { createRoot } from 'react-dom/client'
const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
      domain="dev-o29blmmc.us.auth0.com"
      clientId="GrK7cECOf1NNgSE9KBjNPOTfJuMOyOOD"
      redirectUri={window.location.origin}
      >
      <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
);