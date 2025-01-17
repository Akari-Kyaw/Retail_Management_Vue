<script setup>
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Button from '@/components/ui/button/Button.vue';
import { saveSale } from '@/api/sale/queries';

const cartStore=useCartStore();
const {cartItems}=storeToRefs(cartStore);
const totalAmount=computed(()=>{
    return cartItems.value.reduce((total, item) => {
    return total + (item.quantity * item.sellingPrice);
  }, 0);
})

const { mutate: save } = saveSale.useMutation();

const checkout = () => {
  try {
    for (const item of cartItems.value) {

      const saleData = {
        productId: item.productId,
        qty: item.quantity,
        created_by: 'admin',
      };

    save(saleData);
    cartStore.clearCart();
    }


    alert('Thank you for shopping!');
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('There was an error processing your checkout. Please try again.');
  }
};
</script>

<template>
    <div>
    <h1 class="text-2xl font-bold mb-4 text-center">Cashier</h1>
    <div v-if="cartItems.length === 0" class="text-gray-500 text-center">
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
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in cartItems" :key="item.productId">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.quantity }}</TableCell>
          <TableCell>{{ item.sellingPrice }}</TableCell>
          <TableCell>{{ item.quantity * item.sellingPrice }}</TableCell>
        </TableRow>
      </TableBody>
     <RouterLink to="/cart">
        <div class="absolute left-30 flex items-center">
        <Button > Back To Cart</Button>

    </div> 
     </RouterLink>
    <div class="absolute right-10 flex items-center">
        <Button @click="checkout"> Check Out</Button>

    </div>
    </Table>
   
    <div class="mt-4 text-center text-2xl ">
      <strong>Total Amount: {{ totalAmount }}</strong>
    </div>
  </div>
    
</template>