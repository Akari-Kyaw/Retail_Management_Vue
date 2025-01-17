import { all } from 'axios';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
export interface Product{
  productId: string;
  name:string;
  sellingPrice:number;
  remainingStock:number
  profit:number
}
export interface Item extends Product{
   quantity: number;
}
export const useCartStore = defineStore('cart', () =>{
  const cartItems = reactive<Item[]>([]);
  
    const addToCart = (product:Product)=>{
      const existingProduct = cartItems.find(item => item.productId === product.productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartItems.push({...product, quantity: 1 });
      }
      console.log(cartItems);
    };

    const removeFromCart= (productId: string) =>{
      const index = cartItems.findIndex(item => item.productId === productId);
      if (index !== -1) {
        cartItems.splice(index, 1);
      }
    };
    const updateQuantity = (productId: string, quantity: number) => {
      const item = cartItems.find(item => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    };
  
    const clearCart= () =>{
      cartItems.length=0;
    };

    
    
    return{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity
    }
  
    
 
});