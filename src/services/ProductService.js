import axios from "axios"


export const getAllProduct = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAll-Product`, data)
    return res.data
}