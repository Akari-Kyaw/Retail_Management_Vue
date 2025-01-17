<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
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
import { fetchSale } from '@/api/sale/queries';
import { fetchTotal } from '@/api/sale/queries';


const {data}=fetchSale.useQuery()

const{data:totals}=fetchTotal.useQuery()



</script>

<template>
  <div>
  </div>
  
    <div class="flex justify-center mt-5 mb-5">
    <div class="bg-gray-200 shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 class="text-center font-semibold text-2xl mb-4">Sales Summary</h1>
      <div class="text-center font-semibold text-xl">
        <p class="mb-2">
          Total Profit: <span class="text-green-600">{{ totals?.totalProfit }}</span>
        </p>
        <p>
          Total Revenue: <span class="text-blue-600">{{ totals?.total }}</span>
        </p>
      </div>
    </div>
  </div>


   
         
    
      <div>
        <Table >
    <TableCaption>Sale Lists</TableCaption>
    <TableHeader class="bg-gray-200">
      <TableRow>
        <TableHead>
          Product ID
        </TableHead>
        <TableHead>Sale Quantity</TableHead>
        <TableHead>Total Price</TableHead>
        <TableHead>
          Total Profit
        </TableHead>
        <TableHead>Action</TableHead>

      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="sale in data" :key="sale.saleId">
        <TableCell class="font-medium">
          {{ sale.productId }}
        </TableCell>
        <TableCell>{{sale.qty}}</TableCell>
        <TableCell>{{ sale.totalPrice}}</TableCell>
        <TableCell>
          {{ sale.totalProfit}}
        </TableCell>
        <TableCell>
          <div class="flex space-x-4">
           
              <Button variant="secondary">Add</Button>
           
          <Button >Edit</Button>
          <Button variant="destructive">Delete</Button>
          </div>

        </TableCell>

      </TableRow>
    </TableBody>
  </Table>
  
      </div>
</template>