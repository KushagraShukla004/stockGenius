export const theme = {
  token: {
    colorPrimary: "#F13AB1", // Pink
    colorSuccess: "#0eecc0", // Green
    colorInfo: "#4898d5", // Blue
    colorWarning: "#ffcc29", // Yellow
    colorError: "#ff4d4d", // Red
    colorBgBase: "#282625", // Black
    colorTextBase: "#ffffff", // White
    borderRadius: 8,
    controlHeight: 40,
    fontSize: 16,
  },
  components: {
    Table: {
      headerBg: "#333130", // Darker shade of our background
      headerColor: "#ffffff", // White text
      rowHoverBg: "rgba(241, 58, 177, 0.1)", // Pink with opacity
      rowSelectedBg: "rgba(241, 58, 177, 0.15)", // Pink with opacity
      borderColor: "#3d3a39", // Muted color
    },
    Input: {
      controlHeight: 40,
      activeBg: "#333130",
      activeBorderColor: "#F13AB1",
      hoverBorderColor: "#F13AB1",
    },
    Select: {
      optionSelectedBg: "rgba(241, 58, 177, 0.2)",
    },
    Button: {
      defaultBg: "#333130",
      defaultColor: "#ffffff",
    },
  },
};
