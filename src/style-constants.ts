export const COLORS = {
  text: "#111111",
  mainBackground: "#e9ecee",
  pageBackground: "white",
  disabled: "#bfbfbf",
  accent: "#5da647",
};

export const controlBorderRadius = "5px";

export const BREAKPOINTS: Record<string, number> = {
  tabletMin: 750,
  laptopMin: 1100,
  desktopMin: 1500,
};

export const QUERIES: Record<string, string> = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin}px)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin}px)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin}px)`,
};
