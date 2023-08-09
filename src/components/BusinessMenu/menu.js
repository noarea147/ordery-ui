import React, { useState } from "react";
import Image from "next/image";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import LocalCafeOutlinedIcon from "@mui/icons-material/LocalCafeOutlined";
import LocalDrinkOutlinedIcon from "@mui/icons-material/LocalDrinkOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LocalCafeTwoToneIcon from "@mui/icons-material/LocalCafeTwoTone";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { useCart } from "../../context/CartContext";

export default function Menu(props) {
  const [show, setShow] = useState(false);
  const { cartDispatch } = useCart();

  const handleAddToCart = (product) => {
    cartDispatch({ type: "ADD_TO_CART", payload: product });
  };

  const iconComponent = (name) => {
    switch (name) {
      case "Cafe":
        return (
          <Image
            src="/Icons/CoffeeMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "The":
        return (
          <Image
            src="/Icons/TeaMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Chocolat":
        return (
          <Image
            src="/Icons/ChocolateMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Cocktail":
        return (
          <Image
            src="/Icons/CocktailMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Jus":
        return (
          <Image
            src="/Icons/JuiceMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Mojito":
        return (
          <Image
            src="/Icons/MojitoMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Crepe":
        return (
          <Image
            src="/Icons/CrepeMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Gaufre":
        return (
          <Image
            src="/Icons/GaufreMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Boisson":
        return (
          <Image
            src="/Icons/DrinksMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      case "Chicha":
        return (
          <Image
            src="/Icons/ChichaMenuIcon.svg"
            alt="menu"
            width={56}
            height={56}
          />
        );
      default:
        return <></>;
    }
  };
  console.log(props);

  return (
    <div
      className="flex flex-col items-center justify-center w-full p-2"
      style={{ marginBottom: !show && props.margin }}>
      <div
        onClick={() => setShow(!show)}
        className="flex flex-row justify-between items-center w-full rounded-xl shadow-xl p-3"
        style={{ backgroundColor: "#ef9336" }}>
        <h3 className=" text-left text-2xl text-white">
          {show ? (
            <RemoveCircleOutlineRoundedIcon />
          ) : (
            <AddCircleOutlineRoundedIcon />
          )}{" "}
          {props.name}
        </h3>
        {iconComponent(props?.name)}
      </div>
      {show && (
        <div
          className="flex flex-col  w-full pt-3 rounded-b-xl leading-relaxed"
          style={{
            backgroundColor: "#ef9336",
            marginTop: "-10px",
            marginBottom: props.margin,
          }}
          data-aos="fade-down"
          data-aos-duration="300">
          <table className="w-full">
            <tbody>
              {props.data.map((drink, index) => (
                <tr key={index}>
                  <td
                    width={"70%"}
                    className="text-xl text-white py-3 pl-6"
                    style={{ wordBreak: "break-word" }}>
                    {drink.name}
                  </td>

                  {drink.prices?.length > 1 ? (
                    <td
                      width={"20%"}
                      key={index}
                      className="text-lg text-center text-white py-3 whitespace-normal ">
                      {
                        (drink.prices[0].price,
                        " - ",
                        drink.prices[drink.prices?.length - 1].price)
                      }{" "}
                      dt
                    </td>
                  ) : (
                    <td
                      width={"20%"}
                      key={index}
                      className="text-lg text-center text-white py-3 whitespace-normal ">
                      {(drink.prices[0].price, " dt")}
                    </td>
                  )}
                  <td className="pl-6 pr-6 py-3">
                    <AddCircleOutlinedIcon
                      data-aos="fade-in"
                      data-aos-duration="1000"
                      data-aos-mirror="true"
                      data-aos-easing="ease-in-out"
                      onClick={() => handleAddToCart(drink)}
                      style={{
                        color: "white",
                        fontSize: "25px",
                        backgroundColor: "#ef9336",
                        borderRadius: "50%",
                        zIndex: 20,
                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
