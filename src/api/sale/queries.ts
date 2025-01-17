import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/vue-query";
import saleServices from './services'
import { SaleType, SaveSaleType, TotalType } from "./type";
import { APIResponse } from "../config";

export const fetchSale={
    useQuery:(opt?: UseQueryOptions<SaleType[],Error>)=>
        useQuery<SaleType[],Error>({
            queryKey:['getAllSale'],
            queryFn:async()=>{

                const response:APIResponse<SaleType[]>=await saleServices.getAllSale()
                return response.data
            },
            ...opt
        })
        
}
export const saveSale={
    useMutation:(opt? : UseMutationOptions<any,Error,SaveSaleType,any>)=>{
        const queryClient=useQueryClient()
        return useMutation({
            mutationKey:['savesale'],
            mutationFn:(payload: SaveSaleType)=>saleServices.saveSale(payload),
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:['saveSale']})
            },
            ...opt
        })
    }
            
}
export const fetchTotal={
    useQuery:(opt?: UseQueryOptions<TotalType,Error>)=>
        useQuery<TotalType,Error>({
            queryKey:['getTotal'],
            queryFn:async()=>{

                const response:APIResponse<TotalType>=await saleServices.getTotal()
                return response.data
            },
            ...opt
        })
        
}