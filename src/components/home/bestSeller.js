// rafce = ket react fomat
import React, { useState, useEffect } from "react";
import ProductCard from "../card/productCard";
import LoadingCard from "../card/loadingCard";
// Function
import { listProductBy } from "../function/product";

const BestSeller = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("sold", "desc", 4)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={4}/>
        ) : (
          <div className="row">
            {products.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BestSeller;
