import axios from "axios";

export const listUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/changestatus", value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/changerole", value, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  return await axios.delete(process.env.REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const changePassword = async (authtoken, id, values) => {
  return await axios.put(process.env.REACT_APP_API + "/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

// Save Address
export const saveAddress = async (authtoken, address) => {
  console.log("address: ", address)
  return await axios.post(
    process.env.REACT_APP_API + "/user/address",
    address,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserAddress = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/address", {
    headers: {
      authtoken,
    },
  });
};

// Save Order
export const saveOrder = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/order",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOrders = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/orders", {
    headers: {
      authtoken,
    },
  });
};

// Favorites
export const getFavorites = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/favorites", {
    headers: {
      authtoken,
    },
  });
};

export const addFavorites = async (authtoken, productId) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/favorites",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeFavorites = async (authtoken, productId) => {
  return await axios.put(
    process.env.REACT_APP_API + "/user/favorites/" + productId,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
