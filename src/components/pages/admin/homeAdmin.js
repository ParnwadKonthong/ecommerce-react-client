// rafce = key react fomat
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Function
import { listProduct, removeProduct } from "../../function/product";
import AdminProductCard from "../../card/adminProductCard";
// Notify
import { toast } from "react-toastify";
// Link
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(100);
  }, []);

  const loadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("คุณต้องการลบใช่หรือไม่?")) {
      removeProduct(user.token, id)
        .then((res) => {
          toast.success("ลบ " + res.data.title + " สำเร็จ");
          loadData(100);
          console.log(res);
        })
        .catch((err) => {
          toast.error("ลบไม่สำเร็จ");
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-4">สินค้าทั้งหมด🗃️</h1>
      {loading ? (
        <span>Loading...</span> //true
      ) : (
        <span></span>
      )}

      <Link className="d-flex align-items-center" to={"/admin/create-product"} style={{
                  textDecoration: "none",
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                }}>
        <span className="material-icons me-1">add</span>เพิ่มสินค้า
      </Link>
      <div className="row ">
        {product.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3" key={item._id}>
            <AdminProductCard handleRemove={handleRemove} product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
