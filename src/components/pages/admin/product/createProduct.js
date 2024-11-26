// rafce = key react fomat
import React, { useState, useEffect } from "react";

// redux
import { useSelector } from "react-redux";

// notification
import { toast } from "react-toastify";

// function
import { createProduct } from "../../../function/product";
import { listCategory } from "../../../function/category";

// FileUpload
import FileUpload from "./fileUpload";

const initialstate = {
  title: "",
  categories: [],
  category: "",
  description: "",
  price: "",
  quantity: "",
  images: [],
};

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    laodData(user.token);
  }, []);

  const laodData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("values", values);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        toast.success("เพิ่ม " + res.data.title + " สำเร็จ");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">เพิ่มสินค้าใหม่กันเถอะ🤖💥</h1>
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
              >
                <option>กรุณาเลือกประเภท</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => (
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

export default Home;
