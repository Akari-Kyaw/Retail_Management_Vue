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
import { useSorted } from '@vueuse/core';


const {data}=fetchSale.useQuery()

const{data:totals}=fetchTotal.useQuery()
// const sortedSales = computed(() => {
//   if (!data?.value) return []
//   return [...data.value].sort(
//     (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//   )
// })




</script>

<template>
  <div>
  </div>
  
    <div class="flex justify-center mt-5 mb-5">
    <div class="bg-white-200 shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 class="text-center font-semibold text-2xl mb-4 text-sky-400">Sales Summary</h1>
      <div class="text-center font-semibold text-xl">
        <p class="mb-2">
          Total Profit: <span class="text-green-600">{{ totals?.totalProfit }}</span>
        </p>
        <p>
          Total Revenue: <span class="text-blue-600">{{ totals?.total }}</span>
        </p>
        <p v-if="data">
              Total Sale: <span class="text-pink-600">{{ data.length }}</span>
            </p>
            <p v-else>
              Total Sale: 0
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
          No
        </TableHead>
        <TableHead>
          Product ID
        </TableHead>
        <TableHead>Sale Quantity</TableHead>
        <TableHead>Total Price</TableHead>
        <TableHead>
          Total Profit
        </TableHead>
        <TableHead>
          Sale Date
        </TableHead>
        <!-- <TableHead>Action</TableHead> -->

      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(sale,index) in data" :key="index">
        <TableCell class="font-medium">
          {{ index+1}}
        </TableCell>
        <TableCell class="font-medium">
          {{ sale.productId }}
        </TableCell>
        <TableCell>{{sale.qty}}</TableCell>
        <TableCell>{{ sale.totalPrice}}</TableCell>
        <TableCell>
          {{ sale.totalProfit}}
        </TableCell>
        <TableCell>
          {{ (new Date(sale.created_at).toDateString())}}
        </TableCell>
        <!-- <TableCell>
          <div class="flex space-x-4">
           
              <Button variant="secondary">Add</Button>
           
          <Button >Edit</Button>
          <Button variant="destructive">Delete</Button>
          </div>

        </TableCell> -->

      </TableRow>
    </TableBody>
  </Table>
  
      </div>
</template>