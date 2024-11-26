// rafce = key react fomat
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loadingToRedirect";
import { currentAdmin } from "../function/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    } else {
      setOk(false);
    }
  }, [user]);

  return ok && user.token ? children : <LoadingToRedirect />;
};

export default AdminRoute;
