import axiosInstance, { APIResponse } from "../config"
import { AddProductType, DeleteProductType, EditProductType, ProductType } from "./types"

const baseURL='/product'
const getAllProduct=async():Promise<APIResponse<ProductType[]>>=>{
    const response=await axiosInstance.get<APIResponse<ProductType[]>>(`${baseURL}/GetAllProduct`)
    return response.data
}
const addProduct=async(add:AddProductType):Promise<APIResponse<AddProductType[]>>=>{
    const response=await axiosInstance.post<APIResponse<AddProductType[]>>(`${baseURL}/AddProduct`,add)
    return response.data
}
const editProduct=async(edit:EditProductType):Promise<APIResponse<EditProductType[]>>=>{
    const response=await axiosInstance.post<APIResponse<EditProductType[]>>(`${baseURL}/UpdateProduct`,edit)
    return response.data
}
const deleteProduct = async (productId: string): Promise<APIResponse<string>> => {
    const response = await axiosInstance.post<APIResponse<string>>(`${baseURL}/DeleteProduct?id=${productId}`);
    return response.data;
}

export default { getAllProduct,addProduct,editProduct,deleteProduct }
