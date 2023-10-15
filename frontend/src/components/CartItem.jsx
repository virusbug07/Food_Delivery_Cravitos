import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: cartItems,
    });
  };

  const updateQty = (action, id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = action === "add" ? item.qty + 1 : Math.max(item.qty - 1, 1);
        return { ...item, qty: newQty };
      }
      return item;
    });

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: updatedCartItems,
    });
  };

  useEffect(() => {
    const totalPrice = cartItems.reduce((accumulator, item) => {
      if (!isNaN(item.qty) && !isNaN(item.price)) {
        return accumulator + item.qty * parseFloat(item.price);
      }
      return accumulator;
    }, 0);

    setQty(item.qty);
    setFlag(flag + 1);
  }, [cartItems, flag, item.qty]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={item?.imageURL}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          ₹ {!isNaN(item.price) ? parseFloat(item?.price) * qty : "Invalid Price"}
        </p>
      </div>

      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50 " />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
