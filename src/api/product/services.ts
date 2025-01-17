import axiosInstance, { APIResponse } from "../config"
import { AddProductType, ProductType } from "./types"

const baseURL='/product'
const getAllProduct=async():Promise<APIResponse<ProductType[]>>=>{
    const response=await axiosInstance.get<APIResponse<ProductType[]>>(`${baseURL}/GetAllProduct`)
    return response.data
}
const addProduct=async(add:AddProductType):Promise<APIResponse<AddProductType[]>>=>{
    const response=await axiosInstance.post<APIResponse<AddProductType[]>>(`${baseURL}/AddProduct`,add)
    return response.data
}
export default { getAllProduct,addProduct }
