<script setup lang="ts">
import { fetchProducts } from '@/api/product/quries';
import { ProductType } from '@/api/product/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { computed, ref } from 'vue';
import {useQuery, type UseQueryOptions } from '@tanstack/vue-query'
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { ShoppingBagIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';

const {data:products}=fetchProducts.useQuery()
const cartStore = useCartStore(); 
const{cartItems}=storeToRefs(cartStore)

const cartItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

// const addToCart = (product: ProductType) => {
//   const stock=cartStore.updateQuantity  ;
//   // console.log(product)
//   cartStore.addToCart(product);
//   // console.log(cartStore.cartItems); 
// };

const addToCart = (product: ProductType) => {
  const quantityToAdd = cartItems.value.find(item=>item.productId===product.productId) ; 
if(product.remainingStock===0){
  alert("Product is Out of Stock")
  return;
}
  if(quantityToAdd){
    if (quantityToAdd.quantity < product.remainingStock) {
   quantityToAdd.quantity+=1; 
  } else {
    alert("Not enough stock available."); 
  }
  }
  else {
    cartItems.value.push({ ...product, quantity: 1 });
};}

const removeFromCart = (product: ProductType) => {
  cartStore.removeFromCart(product.productId); 
};
</script>

<template>
  <div class="relative mb-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Shopping Product</h1>
   
    <div class="absolute top-50 right-10 flex items-center mb-5">
      <RouterLink to="/cart">
      <ShoppingBagIcon></ShoppingBagIcon>
      <span class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-pink-500 rounded-full">
        {{ cartItemCount }}
      </span>
      </RouterLink>
    </div> <br>
    <div>
    <Table >
    <TableCaption>Product Lists</TableCaption>
    <TableHeader class="bg-gray-200 font-semibold text-foreground ">
      <TableRow>
        <TableHead>
          Name
        </TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead>
          Profit
        </TableHead>
        <TableHead>Action</TableHead>

      </TableRow>
    </TableHeader>
    <TableBody >
      <TableRow v-for="product in products" :key="product.productId" >
        <TableCell class="font-medium ">
          {{ product.name }}
        </TableCell>
        <TableCell >{{ product.sellingPrice}}</TableCell>
        <TableCell>{{ product.remainingStock }}</TableCell>
        <TableCell>
          {{ product.profit }}
        </TableCell>
        <TableCell>
          <div class="flex space-x-4">
           
            <Button variant="secondary"@click="addToCart(product)  "  >Add To Cart</Button>
          <Button variant="destructive" @click="removeFromCart(product)">Remove from Cart</Button>

         </div>

        </TableCell>

      </TableRow>
    </TableBody>
  </Table>
  </div>
 
  </div>
  
</template>