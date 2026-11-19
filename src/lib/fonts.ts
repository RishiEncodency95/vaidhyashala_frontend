import { Hind, Poppins } from "next/font/google";

/** Sans face used by the footer and the product detail page designs. */
export const hind = Hind({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

/** Geometric display face for section titles in the product page designs. */
export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], display: "swap" });
