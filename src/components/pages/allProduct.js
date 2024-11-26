// rafce = ket react fomat
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../card/productCard";

// antd
import { Slider, Checkbox } from "antd";

// fucntion
import { listProduct, searchFilters } from "../function/product";
import { listCategory } from "../function/category";

const AllProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  // category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  // console.log(search.text)
  const { text } = search;

  // Load all data
  useEffect(() => {
    loadData();
    listCategory().then((res) => setCategory(res.data));
  }, []);

  const loadData = () => {
    setLoading(true);
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // load data on user filters search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilters({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  // Filters search
  const fetchDataFilters = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // load data on pricr
  useEffect(() => {
    fetchDataFilters({ price });
  }, [ok]);

  // Filter price
  const handlePrice = (value) => {
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // Filter category
  const handleCheck = (e) => {
    // ค่าปัจจุบันที่ Check
    let inCheck = e.target.value;

    // ค่าเดิมของ check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState);
    fetchDataFilters({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <span className="material-icons me-1 ">tune</span>ตัวกรอง
            </div>
            <hr/>
            <p>ค้นหาด้วยราคาสินค้า</p>
            <Slider value={price} onChange={handlePrice} range max={100000} />
            <hr />
            <p>ค้นหาตามหมวดหมู่สินค้า</p>
            {category.map((item, index) => (
              <Checkbox key={index} value={item._id} onChange={handleCheck} checked={categorySelect.includes(item._id)}>
                {item.name}
              </Checkbox>
            ))}
          </div>
          <div className="col-md-9">
            {loading ? <p>Loading...</p> : " "}
            {product.length < 1 && <p>Product not found</p>}
            <div className="row pb-4">
              {product.map((item, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
                  <ProductCart product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProduct;
