<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { computed } from 'vue';
import {useQuery, type UseQueryOptions } from '@tanstack/vue-query'
import { fetchSale } from '@/api/sale/queries';


const {data}=fetchSale.useQuery()

</script>

<template>
  <Table>
    <TableCaption>Product Lists</TableCaption>
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
</template>