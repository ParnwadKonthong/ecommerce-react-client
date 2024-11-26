// rafce = key react fomat
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const handleChange = (e) => {
    // console.log(e.target.value);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSudmit = (e) =>{
    e.preventDefault();
    navigate('/allproduct?'+text);
  }

  return (
    <form onSubmit={handleSudmit}>
      <input
        onChange={handleChange}
        type="search"
        className="form-control"
        placeholder="ค้นหา"
      ></input>
    </form>
  );
};

export default Search;
