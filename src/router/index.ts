import AppLayout from '@/layouts/AppLayout.vue'
import CartView from '@/modules/cart/CartView.vue'
import CashierView from '@/modules/cashier/CashierView.vue'
import ManagerView from '@/modules/manager/ManagerView.vue'
import ProductView from '@/modules/product/ProductView.vue'
import SaleView from '@/modules/sale/SaleView.vue'
import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'',
      component:AppLayout,
      children:[
        {
          path: '/',
          name: 'productview',
          component: ProductView,
        },
        {
          path: '/sale',
          name: 'saleview',
          component: SaleView,
        },
        {
          path: '/manager',
          name: 'managerview',
          component: ManagerView,
        },
        {
          path: '/cart',
          name: 'cartview',
          component: CartView,
        },
        {
          path: '/cashier',
          name: 'cashier',
          component: CashierView,
        },
      ]
      
    
    
    }
    
  ],
})

export default router
