// rafce = key react fomat
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      toast.error("Max avialable Quantity: " + item.quantity);
      return;
    }

    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cart);
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  // ฟังก์ชันเพิ่มจำนวน
  const handleIncrement = () => {
    if (item.count < item.quantity) {
      const newCount = item.count + 1;
      updateCart(newCount);
    } else {
      toast.error("Max available Quantity: " + item.quantity);
    }
  };

  // ฟังก์ชันลดจำนวน
  const handleDecrement = () => {
    if (item.count > 1) {
      const newCount = item.count - 1;
      updateCart(newCount);
    }
  };

  // ฟังก์ชันสำหรับการอัพเดตตะกร้า
  const updateCart = (count) => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemove = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    console.log(cart);
    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <tbody>
      <tr>
        <td className="align-content-center">
          <img src={item.images[0].url} width="150" height="auto" />
        </td>
        <td className="align-content-center">{item.title}</td>
        <td className="text-center align-content-center">{item.price}</td>
        <td className="text-center align-content-center">
          <div className="input-group">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              className="form-control text-center"
              value={item.count}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </td>
        <td className="text-center align-content-center">
          <span
            className="material-icons"
            onClick={handleRemove}
            style={{
              color: "red",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            delete
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default ProductInCart;
