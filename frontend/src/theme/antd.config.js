export const theme = {
  token: {
    colorPrimary: "#35b0ab", // Updated to teal from our palette
    colorSuccess: "#10B981", // Emerald green
    colorWarning: "#F59E0B", // Amber
    colorError: "#EF4444", // Red
    colorInfo: "#4ecac5", // Updated to light teal from our palette

    colorBgBase: "#0F172A", // Dark blue background
    colorTextBase: "#E2E8F0", // Light gray text

    borderRadius: 8,
    wireframe: false,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,
    fontWeightStrong: 600,

    // Animation settings
    motionEaseInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    motionDurationMid: "0.2s",
    motionDurationSlow: "0.3s",
  },
  components: {
    Button: {
      colorPrimary: "#35b0ab", // Updated to teal
      algorithm: true,
      borderRadius: 6,
      controlHeight: 36,
      fontSize: 14,
      fontWeight: 500,
    },
    Input: {
      colorBgContainer: "#1E293B",
      colorBorder: "#334155",
      borderRadius: 6,
      activeShadow: "0 0 0 2px rgba(53, 176, 171, 0.2)", // Updated to teal
    },
    Select: {
      colorBgContainer: "#1E293B",
      colorBorder: "#334155",
      borderRadius: 6,
      optionSelectedBg: "rgba(53, 176, 171, 0.1)", // Updated to teal
    },
    Table: {
      colorBgContainer: "#1E293B",
      colorBorderSecondary: "#334155",
      headerBg: "#252f3f",
      headerColor: "#e2e8f0",
      headerSplitColor: "#374151",
      rowHoverBg: "rgba(53, 176, 171, 0.08)", // Updated to teal
      selectedRowBg: "rgba(53, 176, 171, 0.12)", // Updated to teal
      borderRadius: 8,
      fontSize: 14,
    },
    Modal: {
      colorBgElevated: "#FFFFFF",
      colorBorderSecondary: "#E2E8F0",
      borderRadiusLG: 12,
      paddingContentHorizontalLG: 24,
    },
    Card: {
      colorBgContainer: "#FFFFFF",
      colorBorderSecondary: "#E2E8F0",
      borderRadiusLG: 12,
      boxShadowTertiary:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    Tabs: {
      colorBgContainer: "#FFFFFF",
      colorPrimary: "#35b0ab", // Updated to teal
      borderRadius: 8,
      inkBarColor: "#35b0ab", // Updated to teal
    },
  },
};
