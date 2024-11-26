// rafce = ket react fomat
import React, { useState, useEffect } from "react";

// Function
import { readProduct } from "../function/product";

import { useParams } from "react-router-dom";

// Page
import ViewProductCard from "../card/viewProductCard"

const Product = () => {
  const param = useParams();
  const [product, setProduct] = useState([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = ()=>{
    readProduct(param.id)
    .then((res)=>{
        setProduct(res.data)
    }).catch((err)=>{
        console.log(err.response.data)
    })
  }

  return (
    <div className="container">
        <div className="row pt-4"><ViewProductCard product={product}/></div>
        {/* <div className="row">{JSON.stringify(product)}</div> */}
      
    </div>
  );
};

export default Product;
