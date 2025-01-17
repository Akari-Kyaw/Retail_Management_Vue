import axiosInstance, { APIResponse } from "../config"
import { SaleType, SaveSaleType, TotalType } from "./type"

const baseURL='/Sale'
const getAllSale=async():Promise<APIResponse<SaleType[]>>=>{
    const response=await axiosInstance.get<APIResponse<SaleType[]>>(`${baseURL}/GetAllSale`)
    return response.data
}

const saveSale=async(sale:SaveSaleType):Promise<APIResponse<SaveSaleType[]>>=>{
    const response=await axiosInstance.post<APIResponse<SaveSaleType[]>>(`${baseURL}/AddSale`,sale)
    return response.data
}
const getTotal=async():Promise<APIResponse<TotalType>>=>{
    const response=await axiosInstance.get<APIResponse<TotalType>>(`${baseURL}/ShowProfit`)
    return response.data
}

export default{getAllSale,saveSale,getTotal}