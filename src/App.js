import { ConfigProvider } from "antd";
import { MainPage } from "./pages/Main/MainPage";
import "./App.css";

function App() {
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
      <div className="App">
        <MainPage />
      </div>
    </ConfigProvider>
  );
}

export default App;
