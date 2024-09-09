// These styles will make sure the component
// is not visible, but will still be announced
// by screen readers.

import { CSSProperties, ReactNode } from "react";

const hiddenStyles: CSSProperties = {
  display: "inline-block",
  position: "absolute",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

type Props = {
  children: ReactNode;
};

export default function VisuallyHidden({ children }: Props) {
  return <span style={hiddenStyles}>{children}</span>;
}
