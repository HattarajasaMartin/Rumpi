import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
// 1. Import Provider dari library Google
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 2. Bungkus dengan GoogleOAuthProvider dan masukkan Client ID */}
    <GoogleOAuthProvider clientId="214626746319-rgbhktfhjgr8bvihpi2ob1bc9gf80ha3.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toasterId="default"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
