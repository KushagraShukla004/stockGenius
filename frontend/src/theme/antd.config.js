export const theme = {
  token: {
    colorPrimary: "#6366F1", // Vibrant indigo
    colorSuccess: "#10B981", // Emerald green
    colorWarning: "#F59E0B", // Amber
    colorError: "#EF4444", // Red
    colorInfo: "#3B82F6", // Blue

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
      colorPrimary: "#6366F1",
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
      activeShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
    },
    Select: {
      colorBgContainer: "#1E293B",
      colorBorder: "#334155",
      borderRadius: 6,
      optionSelectedBg: "rgba(99, 102, 241, 0.1)",
    },
    Table: {
      colorBgContainer: "#1E293B",
      colorBorderSecondary: "#334155",
      headerBg: "#252f3f",
      headerColor: "#e2e8f0",
      headerSplitColor: "#374151",
      rowHoverBg: "rgba(99, 102, 241, 0.08)",
      selectedRowBg: "rgba(99, 102, 241, 0.12)",
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
      colorPrimary: "#4F46E5",
      borderRadius: 8,
      inkBarColor: "#4F46E5",
    },
  },
};
