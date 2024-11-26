// rafce = key react fomat
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // Redirect
    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="text-center p-4 mt-6 mb-6 display-4 ">
      <span>No Permission, redirect in {count}</span>
    </div>
  );
};

export default LoadingToRedirect;
