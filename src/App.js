import { ConfigProvider } from "antd";
import { MainPage } from "./pages/Main/MainPage";
import './App.css';

function App() {

    const primaryColor = '#265183';
  return (
      <ConfigProvider
        theme={{
            token: {
                colorPrimary: primaryColor,
                colorPrimaryText: primaryColor,
                colorPrimaryTextActive: primaryColor,
                colorText: primaryColor,
            },
            components: {
                Typography: {
                    titleMarginTop: '0.25rem'
                }
            }
      }}
      >
          <div className="App">
              <MainPage />
          </div>
      </ConfigProvider>
  );
}

export default App;
