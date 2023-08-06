import "./globals.css";
import { Bree_Serif } from "next/font/google";
import { AOSInit } from "../helpers/aos";
import { CartProvider } from "../context/CartContext";
import MenuProvider from "../context/MenuContext";
import BusinessProvider from "../context/BusinessContext";
import AuthProvider from "../context/AuthContext";

const pacifico = Bree_Serif({
  weight: "400",
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
      <AuthProvider>
        <BusinessProvider>
          <CartProvider>
            <MenuProvider>
              <body className={pacifico.className}>{children}</body>
            </MenuProvider>
          </CartProvider>
        </BusinessProvider>
      </AuthProvider>
    </html>
  );
}
