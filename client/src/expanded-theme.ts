/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Palette,
  PaletteColor,
  TypeBackground,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface TypeBackground {
    alt: string;
  }

  interface Palette {
    neutral: Record<string, string>;
  }
}