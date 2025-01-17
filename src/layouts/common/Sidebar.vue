<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
</script>

<template>
  <div class="flex min-h-screen flex-col w-sm bg-blue-200">
    
    <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div class="mx-auto grid w-full max-w-4xl gap-2">
        <h2 class="font-semibold">
          Retail Management
        </h2>
      </div>
      <div class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav class="grid gap-4 text-sm text-muted-foreground ">
            <RouterLink
          to="/"
          class="text-foreground font-semibold transition-colors hover:text-muted-foreground "
        >
          Product
        </RouterLink>
        <!-- <RouterLink
          to="/sale"
          class="text-foreground font-semibold transition-colors hover:text-muted-foreground"
        >
          Sale
        </RouterLink> -->
        <RouterLink
          to="/manager"
          class="text-foreground font-semibold transition-colors hover:text-muted-foreground"
        >
          Manager
        </RouterLink>
        <RouterLink
          to="/cart"
          class="text-foreground font-semibold transition-colors hover:text-muted-foreground"
        >
          Cart
        </RouterLink><RouterLink
          to="/cashier"
          class="text-foreground font-semibold transition-colors hover:text-muted-foreground"
        >
          Cashier
        </RouterLink>
        </nav>
       
      </div>
    </main>
  </div>
</template>