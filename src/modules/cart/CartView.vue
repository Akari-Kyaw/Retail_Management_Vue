<script setup lang="ts">
import { computed } from 'vue';
import { fetchProducts } from '@/api/product/quries';
import { useCartStore } from '@/stores/cart';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { storeToRefs } from 'pinia';
import {Item} from '@/stores/cart'
const cartStore = useCartStore();
//const { data: products } = fetchProducts.useQuery();
//console.log(cartStore.items);
//const cartItems = computed(() => cartStore.items);
//console.log(cartItems)
const item =cartStore.cartItems;
console.log(item)

const getProductName = (productId: string) => {
  const product = item.find(p => p.productId === productId);
  return product ? product.name : 'Unknown Product';
};

const getProductPrice = (productId: string) => {
  const product = item?.find(p => p.productId === productId);
  return product ? product.sellingPrice : 0;
};
const getProductProfit = (productId: string) => {
  const product = item?.find(p => p.productId === productId);
  return product ? product.profit: 0;
};


const totalAmount = computed(() => {
  return item.reduce((total, item) => {
    return total + (item.quantity * getProductPrice(item.productId));
  }, 0);
}); 


const removeFromCart = (productId: string) => {
  cartStore.removeFromCart(productId);
};
const updateQuantity = (productId: string, quantity: number) => {
  const stock=item?.find(p=>p.productId===productId)
  
  
  if(!stock){
    
    return;
  }
  const remainingStock=stock.remainingStock
  if (quantity <= 0) {
    removeFromCart(productId);
  } 
  else if(quantity<=remainingStock){
    cartStore.updateQuantity(productId, quantity);
  }
    else {
    cartStore.updateQuantity(productId, remainingStock);
  }
};
</script>
<template>
    <div>
      <h1 class="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>
      <div v-if="item.length === 0" class="text-gray-500 text-center">
        Your cart is empty.
      </div>
      <Table v-else>
        <TableCaption>Your Cart Items</TableCaption>
        <TableHeader class="bg-gray-200">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
          <TableRow v-for="productInCart in item" :key="productInCart.productId">
            <TableCell>{{ getProductName(productInCart.productId) }}</TableCell>
            <TableCell>
            <div class="flex items-center">
              <Button @click="updateQuantity(productInCart.productId, productInCart.quantity - 1)" :disabled="productInCart.quantity <= 1">-</Button>

              <span class="mx-2">{{ productInCart.quantity }}</span>
              <Button @click="updateQuantity(productInCart.productId, productInCart.quantity + 1)">+</Button>
              
            </div>
          </TableCell>
            <!-- <TableCell>{{ productInCart.quantity }}</TableCell> -->
            <TableCell>{{ getProductPrice(productInCart.productId) }}</TableCell>
            <TableCell>{{ productInCart.quantity * getProductPrice(productInCart.productId) }}</TableCell>
            <TableCell>
              <Button variant="destructive" @click="removeFromCart(productInCart.productId)">Remove</Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <div class="absolute top-50 right-10 flex items-center">
          <RouterLink to="/cashier">
            <Button>Cashier</Button>
          </RouterLink>
        </div> <br>

          <div class="absolute left-30 ">
            <strong>Total: {{ totalAmount }}</strong>  
          </div> <br>
        
      </Table>
     
        
    </div>
  </template>