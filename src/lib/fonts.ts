import { Poppins } from "next/font/google";

/** The only typeface of the site: every heading, paragraph, button, menu and card uses Poppins. */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});
