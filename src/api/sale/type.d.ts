export type SaleType={
    saleId: string
    productId: string
    qty:number
    totalPrice: number
    totalProfit:number
    created_at: string
    updated_at: string
    created_by: string
    updated_by:string
    activeFlag: boolean
}
export type SaveSaleType={
    productId: string
    qty:number
    created_by: string
}
export type TotalType={
   total:number
   totalProfit:number
}