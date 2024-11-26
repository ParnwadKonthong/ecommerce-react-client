// rafce = key react fomat
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// antd
import { Button, Drawer } from "antd";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };
  return (
    <Drawer
      title={"ตะกร้ามีสินค้า " + cart.length + " ชิ้น"}
      onClose={onCloseDrawer}
      placement="right"
      visible={drawer}
    >
      {cart.map((item) => (
        <div className="row" key={item.id}>
          <div className="col-4 pb-2 text-center">
            <img src={item.images[0].url} width="100px" />
          </div>
          <div className="col">
            <p className="text-start">
              {item.title} x {item.count}
            </p>
          </div>
        </div>
      ))}
      <Link
        to="/cart"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="col">
          <button
            onClick={onCloseDrawer}
            className="text-center btn btn-success btn btn-dark d-flex justify-content-center w-100"
          >
            ไปยังตะกร้า
          </button>
        </div>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
