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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const locallyStoredUser = JSON.parse(localStorage.getItem("user"));
    if (locallyStoredUser) {
      setIsUserAuthenticated(true);
      setUser(locallyStoredUser);
    } else {
      setIsUserAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setIsUserAuthenticated(true);
        setUser(user);
      } else {
        localStorage.removeItem("user");
        setIsUserAuthenticated(false);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const appContextValue = useMemo(() => {
    return {
      user: {
        email: user?.email,
        userId: user?.uid,
      },
    };
  }, [user]);

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
