import { ComponentType, ReactNode } from "react";

export default function InlineCode(props: {
  children: ReactNode;
  element?: ComponentType | keyof HTMLElementTagNameMap;
}) {
  const Element = props.element ?? "span";

  return <Element style={{ fontFamily: "Fira Mono, monospace" }}>{props.children}</Element>;
}
