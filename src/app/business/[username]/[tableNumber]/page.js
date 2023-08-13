"use client";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Menu from "@/components/BusinessMenu/menu";
import FloatingCart from "@/components/BusinessMenu/floatingCart";
import Modal from "@/components/BusinessMenu/modal";
import { useBusinessContext } from "@/context/BusinessContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import PriceModal from "@/components/BusinessMenu/priceModal";
import LoginIcon from "@mui/icons-material/Login";
import notInShop from "@/animations/notInShop.json";

export default function Home({ params }) {
  const router = useRouter();
  const { getBusinessByUsername } = useBusinessContext();
  const [business, setBusiness] = useState([]);
  const [businessId, setBusinessId] = useState();
  const [tableNumber, setTableNumber] = useState();
  const { cartDispatch } = useCart();
  const [added, setAdded] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isInShop, setIsInShop] = useState(false);

  useEffect(() => {
    const getMenus = async () => {
      const response = await getBusinessByUsername({
        username: params.username,
      });
      if (response.data.StatusCode === 200) {
        setBusiness(response.data.Data);
        setBusinessId(response.data.Data._id);
        setTableNumber(params.tableNumber);
      }
    };
    getMenus();
  }, [added]);

  useEffect(() => {
    const checkLocation = async () => {
      const response = await getBusinessByUsername({
        username: params.username,
      });
      if (response.data.StatusCode === 200) {
        const { lng, lat } = response.data.Data.location;
        const { maxDistance } = response.data.Data;

        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
          console.log(lat1, lon1, lat2, lon2);
          const R = 6371; // Radius of the earth in km
          const dLat = deg2rad(lat2 - lat1);
          const dLon = deg2rad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in km
          return distance;
        }

        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }
        const distance = getDistanceFromLatLonInKm(
          lat,
          lng,
          location.lat,
          location.lng
        );
        console.log(maxDistance, distance * 1000);
        if (distance * 1000 > maxDistance) {
          setIsInShop(false);
        } else {
          setIsInShop(true);
        }
      }
    };
    checkLocation();
  }, [location]);
  const addToCart = () => {
    setAdded(!added);
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <div>
      <main
        className="flex min-h-screen flex-col items-center justify-start"
        data-aos="fade-in"
        data-aos-duration="500">
        <div className="flex justify-end p-4 w-full">
          <LoginIcon
            className="inline-block h-10 w-10 rounded-full cursor-pointer"
            width={35}
            height={35}
            onClick={() => router.push("/login")}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-10 mb-10">
          {/* <Image
            src="/next.svg"
            alt="Coffee Logo"
            className="dark:invert mb-4"
            width={100}
            height={100}
            priority
          /> */}
          <h1
            className="text-3xl font-bold text-center"
            data-aos="fade-in"
            data-aos-duration="500">
            Welcome to {business.businessName}
          </h1>
        </div>
        {isInShop ? (
          <>
            <div className="flex flex-col justify-start w-full">
              <h2 className="text-2xl font-bold text-center mt-10 mb-5">
                {"Menu"}
              </h2>
            </div>
            {business.menus?.map((menu, index) =>
              index + 1 === business.length ? (
                <Menu
                  key={index}
                  name={menu.category}
                  data={menu.products}
                  margin={"75px"}
                  added={addToCart}
                />
              ) : (
                <Menu
                  key={index}
                  name={menu.category}
                  data={menu.products}
                  margin={"0px"}
                  added={addToCart}
                />
              )
            )}
            <footer
              className="flex flex-col items-center justify-center w-full h-24"
              onClick={() => cartDispatch({ type: "TOGGLE_CART" })}>
              <FloatingCart />
            </footer>

            <PriceModal data={business.menus} />
            <Modal tableNumber={tableNumber} businessId={businessId} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-24 border-t mt-10">
            <Lottie animationData={notInShop} height={100} width={100} />
            <h1 className="text-3xl font-bold text-center">
              You are not in the shop
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}
