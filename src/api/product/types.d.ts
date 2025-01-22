export type ProductType={
    productId: string
      name: string
      remainingStock:number
      sellingPrice: number
      profit: number
      created_at: string
      updated_at: string
      created_by: string
      updated_by: string
      activeFlag: boolean
}
export type AddProductType={
  
    name: string
    remainingStock: number
    sellingPrice: number
    profit: number
    createdBy: string
  }

  export type EditProductType={
    name: string
    remainingStock: number
    sellingPrice: number
    profit: number
    update_by: string
  }

  export type DeleteProductType={
    productId: string
  }
