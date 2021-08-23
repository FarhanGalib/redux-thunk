import axios from "axios";

export const requestAddNewProduct = (newProduct) => {
   return (dispatch) => {
    axios.post("https://fakestoreapi.com/products",newProduct);
   }
};



