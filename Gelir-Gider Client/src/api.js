import axios from 'axios';
import jwt_decode from "jwt-decode";


axios.interceptors.request.use(
    function (config) {
   const {origin} = new URL(config.url)

   const allowedOrigins = ["http://localhost:3000"];
   const token = localStorage.getItem('access-token')

   if (allowedOrigins.includes(origin)) {
    if((token && jwt_decode(localStorage.getItem('access-token')).exp > Math.floor(Date.now() / 1000))){
    config.headers.authorization = token;
    config.headers.user = localStorage.getItem('userid')
    }
   }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  //User
  export const fetchKayitOl = async (input) => {
const {data} = await axios.post("http://localhost:3000/api/users", input)
return data;
};

export const fetchLogin= async (input) => {
const {data} = await axios.post("http://localhost:3000/api/users/login", input)
return data;
};
export const fetchLogout = async () => {
const {data} = await axios.post("http://localhost:3000/api/users/logout" , {refresh_token: localStorage.getItem("refresh-token")})
return data;
};



export const fetchMe = async () => {
  if (jwt_decode(localStorage.getItem('access-token')).exp > Math.floor(Date.now() / 1000)) {
    const {data} = await axios.get('http://localhost:3000/api/users/me');
    return data
 } else {
   const data = {message: "jwt expired"}
   return data
  }
};
  

// export const fetchRefresh = async () => {
//   console.log("selam");
//   const {data} = await axios.post('http://localhost:3000/api/users/refresh_token',{
//      refresh_token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY1MzE3YWVhMWUzYTVjOWExM2U3ODEiLCJpYXQiOjE2ODQzNTM0MDIsImV4cCI6MTY5MjEyOTQwMn0.p5RT0Nf_E9LKZB6Wxr0gDlF-CuSaDl8YJMhGY6TcE2M"
//   })
//   console.log(data);
//   return data;
// };



//income
export const bringIncome = async () => {
  const {data} = await axios.get('http://localhost:3000/api/incomes')

  return data;
};
export const saveIncome = async (input) => {
  const {data} = await axios.post("http://localhost:3000/api/incomes",input)

  return data

};
export const deleteIncome = async (income_id) => {
  const {data} = await axios.delete(`http://localhost:3000/api/incomes/${income_id}`);

  return data
}

//expense
export const fetchExpenseList = async () => {
const {data} = await axios.get("http://localhost:3000/api/expenses")
return data;
};
export const saveExpense = async (input) => {
  const {data} = await axios.post("http://localhost:3000/api/expenses",input)

  return data
}
export const bringExpense = async (input) => {
  const {data} = await axios.get("http://localhost:3000/api/expenses")

  return data
}
export const deleteExpense = async (expense_id) => {
  const {data} = await axios.delete(`http://localhost:3000/api/expenses/${expense_id}`);

  return data
}