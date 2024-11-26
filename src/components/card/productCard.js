// rafce = key react fomat
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// lodash
import _ from "lodash";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // console.log(product);
  const { _id, title, description, images } = product;

  return (
    <div className="m-2">
      <div
        className="card h-100"
        style={{
          background: "#f8f9fa",
          padding: 0,
          cursor: "pointer",
          maxWidth: "600px", // กำหนดความกว้างสูงสุดของการ์ด
          height: "170px", // กำหนดความสูงของการ์ด
        }}
      >
        <Link
          to={"/product/" + _id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={images && images.length ? images[0].url : ""}
            className="card-img-top"
            alt={title}
            style={{ objectFit: "cover", height: "180px" }}
          />
          <div
            className="card-body d-flex flex-column"
            style={{ height: "170px", padding: "10px" }}
          >
            <h5
              className="card-title"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              {title}
            </h5>
            <p
              className="card-text"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "12px",
              }}
            >
              {description}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
