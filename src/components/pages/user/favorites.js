// rafce = key react fomat
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavoritesCard from "../../card/favoritesCard";
// Function
import { getFavorites, removeFavorites } from "../../function/users";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getFavorites(user.token)
      .then((res) => {
        setFavorites(res.data.favorites);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (productId, e) => {
    e.preventDefault();
    removeFavorites(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  const showFavorites = () => {
    return (
      <>
      <h3 className="mt-4">รายการโปรดของฉัน💖💕</h3>
        {favorites.map((item, index) => (
          <div
            className="mt-2 col-12 col-sm-6 col-md-4 col-lg-3 pb-3"
            key={index}
          >
            <FavoritesCard product={item} handleRemove={handleRemove}/>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container">
      <div className="row ">
        {favorites.length === 0 ? (
          <h1
            className="text-center"
            style={{ marginTop: "100px", color: "gray" }}
          >
            คุณยังไม่มีรายการโปรด
          </h1>
        ) : (
          showFavorites()
        )}
        ;
      </div>
    </div>
  );
};

export default Favorites;
