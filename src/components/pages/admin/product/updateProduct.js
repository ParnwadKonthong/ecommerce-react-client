// rafce = key react fomat
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

// FileUpload
import FileUpload from "./fileUpload";

// Notify
import { toast } from "react-toastify";

// Function
import { readProduct, updateProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";

const initialstate = {
  title: "",
  categories: [],
  category: "",
  description: "",
  price: "",
  quantity: "",
  images: [],
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updateProduct(user.token, values._id, values)
      .then((res) => {
        setLoading(false);
        toast.success("อัปเดต " + res.data.title + " สำเร็จ");
        console.log(res.data);
        navigate("/admin/home");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("อัปเดตไม่สำเร็จ!!");
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">แก้ไขสินค้า🗂️✏️</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center"> 
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="ชื่อสินค้า"
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="รายละเอียด"
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                placeholder="ราคา"
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
                placeholder="จำนวน"
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
                value={values.category._id}
              >
                <option>กรุณาเลือกประเภท</option>
                {category.length > 0 &&
                  category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
            {loading ? (
              <span></span>
            ) : (
              <button className="btn btn-dark w-100">บันทึก</button>
            )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
