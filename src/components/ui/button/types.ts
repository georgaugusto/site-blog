import { ComponentProps } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColor =
  | "default"
  | "white"
  | "black"
  | "red"
  | "yellow"
  | "green"
  | "blue";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  auto?: boolean;
  loading?: boolean;
}
