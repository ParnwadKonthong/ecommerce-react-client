// rafce = ket react fomat
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../card/productInCart";
import { useNavigate } from "react-router-dom";
// Function
import { userCart } from "../function/users";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleSaveOrder = () => {
    userCart(user.token, cart)
      .then((res) => {
        console.log(res);
        navigate("/payment");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCartItem = () => {
    return (
      <>
      <h3>ตะกร้าสินค้าของฉัน</h3>
        <table className="table custom-table">
          <thead className="thead-light">
            <tr className="text-center">
              <th></th>
              <th></th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th></th>
            </tr>
          </thead>
          {cart.map((item) => (
            <ProductInCart key={item._id} item={item} />
          ))}
        </table>
      </>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mt-4">
          {!cart.length ? (
            <h1
              className="text-center"
              style={{ marginTop: "100px", color: "gray" }}
            >
              ไม่มีสินค้าในตะกร้า
            </h1>
          ) : (
            showCartItem()
          )}
        </div>

        <div className="col-md-4 mt-4">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">ยอดคำสั่งซื้อ</h4>
                <hr />
                <div class="card-text row mb-2">
                  <div className="col text-start">ราคา</div>
                  <div className="col text-end">{getTotal()} บาท</div>
                </div>

                <div class="card-text row mb-4">
                  <div className="col text-start">ค่าจัดส่ง</div>
                  <div className="col text-end">ฟรี</div>
                </div>

                <hr />
                <div class="card-text row">
                  <div className="col text-start">
                    <b>ยอดรวมทั้งหมด</b>
                  </div>
                  <div className="col text-end">
                    <b>{getTotal()} บาท</b>
                  </div>
                </div>

                <div class="card-text row mt-4">
                  <div className="col">
                    <button
                      className="btn btn-dark d-flex justify-content-center w-100"
                      onClick={handleSaveOrder}
                      disabled={!cart.length}
                    >
                      เลือกที่อยู่จัดส่ง
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* สินค้าในตะกร้า
          {cart.map((item, index) => (
            <p key={index}>
              {item.title} x {item.count} = {item.price * item.count}
            </p>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
