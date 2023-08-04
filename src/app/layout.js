import "./globals.css";
import { Edu_SA_Beginner } from "next/font/google";
import { AOSInit } from "../helpers/aos";
import { CartProvider } from "../context/CartContext";
import MenuProvider from "../context/MenuContext";

const edu_sa_beginner = Edu_SA_Beginner({
  weight: "700",
  formats: ["woff2"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Ordry",
  description: "your e-menu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AOSInit />
      <CartProvider>
        <MenuProvider>
          <body className={edu_sa_beginner.className}>{children}</body>
        </MenuProvider>
      </CartProvider>
    </html>
  );
}
