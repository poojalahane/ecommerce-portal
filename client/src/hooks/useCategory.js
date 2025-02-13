import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //! get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-all"
      );
      //console.log(data.category);
      setCategories(data.category);
      //  console.log(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
