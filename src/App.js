import { ConfigProvider } from "antd";
import { MainPage } from "./pages/Main/MainPage";
import { AuthPage } from "./pages/Auth/AuthPage";
import "./App.css";
import { useEffect, useState, createContext, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "config/firebase";

export const AppContext = createContext({});

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    console.log("App useEffect");
    if (auth?.currentUser) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
  }, [auth]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
  });

  const appContextValue = useMemo(() => {
    return {
      user: {
        email: auth?.currentUser?.email,
        userId: auth?.currentUser?.uid,
      },
    };
  }, [isUserAuthenticated]);

  const primaryColor = "#265183";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorPrimaryText: primaryColor,
          colorPrimaryTextActive: primaryColor,
          colorTextHeading: primaryColor,
          colorBorder: primaryColor,
          colorText: "#474747",
        },
        components: {
          Typography: {
            titleMarginTop: "0.25rem",
          },
          Button: {
            fontWeight: "800",
          },
        },
      }}
    >
      <AppContext.Provider value={appContextValue}>
        <div className="App">
          {isUserAuthenticated && <MainPage />}
          {!isUserAuthenticated && <AuthPage />}
        </div>
      </AppContext.Provider>
    </ConfigProvider>
  );
}

export default App;
