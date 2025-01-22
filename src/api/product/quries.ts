import {useMutation, UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/vue-query'
import { APIResponse } from "../config"
import productServices from './services'
import { AddProductType, DeleteProductType, EditProductType, ProductType } from "./types"


export const fetchProducts = {
    useQuery: (opt?: UseQueryOptions<ProductType[], Error>) =>
        useQuery<ProductType[], Error>({
            queryKey: ['getAllProduct'],
            queryFn: async () => {
                const response: APIResponse<ProductType[]> = await productServices.getAllProduct()

                return response.data
            },
            ...opt
        })
}
export const addProduct={
    useMutation:(opt? : UseMutationOptions<any,Error,AddProductType,any>)=>{
        const queryClient=useQueryClient()
        return useMutation({
            mutationKey:['addproduct'],
            mutationFn:(payload: AddProductType)=>productServices.addProduct(payload),
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:['getAllProduct']})
            },
            ...opt
        })
    }            
}
export const editProduct={
    useMutation:(opt? : UseMutationOptions<any,Error,EditProductType,any>)=>{
        const queryClient=useQueryClient()
        return useMutation({
            mutationKey:['editproduct'],
            mutationFn:(payload: EditProductType)=>productServices.editProduct(payload),
            onSuccess:()=>{
                queryClient.invalidateQueries({queryKey:['getAllProduct']})
            },
            ...opt
        })
    }}
    export const deleteProduct={
        useMutation:(opt? : UseMutationOptions<any,Error,string,any>)=>{
            const queryClient=useQueryClient()
            return useMutation({
                mutationKey:['deleteproduct'],
                mutationFn:(productId:string)=>productServices.deleteProduct(productId),
                onSuccess:()=>{
                    queryClient.invalidateQueries({queryKey:['getAllProduct']})
                },
                ...opt
            })
        }}