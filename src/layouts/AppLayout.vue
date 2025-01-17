<script setup lang="ts">
import Sidebar from './common/Sidebar.vue';

</script>

<template>
    <div class="h-svh flex overflow-hidden">
        <aside class="min-w-3">
            <Sidebar />
        </aside>
        <main class="w-full min-h-full overflow-y-auto">         
            <RouterView />
        </main>
    </div>
</template>
