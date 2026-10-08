import { Chart as ChartJS } from "chart.js";

// Shared look for every chart. Importing this file applies the defaults.
ChartJS.defaults.font.family = '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';
ChartJS.defaults.font.size = 12;
ChartJS.defaults.color = "#5e767e";

export const gridColor = "#e8eff1";

export const tooltipStyle = {
    backgroundColor: "#0b2a31",
    titleColor: "#ffffff",
    bodyColor: "#cfe9ea",
    padding: 12,
    cornerRadius: 12,
    boxPadding: 4,
    usePointStyle: true,
    titleFont: { weight: "600" },
};
