// rafce = key react fomat
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Function
import { addFavorites } from "../function/users";

// Notifications
import { toast } from "react-toastify";

// lodash
import _ from "lodash";

// react-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ViewProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { _id, title, category, description, images, price, quantity, sold } =
    product;

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });
    let unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem("cart", JSON.stringify(unique));
    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  const handleAddToFavorites = (e) => {
    if (user) {
      addFavorites(user.token, _id)
        .then((res) => {
          console.log(res.data);
          toast.success("Add to Favorites success");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please go to login ");
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 ">
        <Carousel autoPlay showArrows={true} infiniteLoop>
          {images &&
            images.map((item) => <img src={item.url} key={item.pubilc_id} style={{ width: '85%', height: 'auto', objectFit: 'contain' }} />)}
        </Carousel>
      </div>

      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="p-4">
              <h1>{title}</h1>
              {category && (
                <p className="me-1" style={{ color: 'gray' }}>
                  ประเภทสินค้า
                  <span className="ms-2">{category.name}</span>
                </p>
              )}
            </div>

            <div className="p-4">
              <p>{description}</p>
            </div>

            <div className="p-4">
              <h1>฿{price}</h1>
              <p style={{ color: 'gray' }}>ขายแล้ว {sold}</p>
            </div>

            <div className="row p-4">
              <div className="col-1 d-flex justify-content-start">
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={handleAddToFavorites}
                >
                  <span className="material-icons">favorite</span>
                </button>
              </div>

              <div className="col-11 d-flex justify-content-start">
                <button
                  className="btn btn-dark d-flex justify-content-center w-100"
                  onClick={handleAddToCart}
                >
                  <span className="material-icons me-1">shopping_cart</span>
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductCard;
