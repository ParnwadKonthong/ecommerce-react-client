// rafce = key react fomat
import React from "react";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
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

          <div className="row d-flex justify-content-end mt-auto">
            <button
              className="col d-flex justify-content-center align-items-center"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <Link
                to={"/admin/update-product/" + _id}
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  display: "flex",
                  alignItems: "center ",
                }}
              >
                <span className="material-icons me-1">edit</span>แก้ไข
              </Link>
            </button>

            <button
              className="col d-flex justify-content-center align-items-center"
              onClick={() => handleRemove(_id)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "red",
              }}
            >
              <span className="material-icons me-1">delete</span>ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
