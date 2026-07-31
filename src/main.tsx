import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhTW from "antd/locale/zh_TW";
import { App } from "./App";
import "antd/dist/reset.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhTW}
      theme={{
        token: {
          colorPrimary: "#1890ff",
          colorLink: "#1890ff",
          colorText: "rgba(0, 0, 0, 0.88)",
          colorTextSecondary: "rgba(0, 0, 0, 0.65)",
          colorTextDisabled: "rgba(0, 0, 0, 0.25)",
          colorBorder: "#d9d9d9",
          colorSplit: "rgba(5, 5, 5, 0.06)",
          colorBgLayout: "#f5f5f5",
          borderRadius: 8,
          fontFamily: "\"Noto Sans TC\", \"PingFang TC\", \"Microsoft JhengHei\", system-ui, sans-serif",
          fontSize: 14,
          fontSizeSM: 12,
          fontSizeLG: 16,
          fontSizeXL: 20,
          lineHeight: 1.5714285714285714,
          lineHeightSM: 1.6666666666666667,
          lineHeightLG: 1.5,
          fontWeightStrong: 600,
          controlHeight: 32,
          controlHeightSM: 24,
          controlHeightLG: 32,
        },
      }}
    >
      <BrowserRouter><App /></BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
