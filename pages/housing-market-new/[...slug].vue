<template>
    <div>
        <Index />
    </div>
</template>

<script setup>
import Index from '~/components/housing-market-new/top-banner/index.vue';

    const slug = ref("");
    const route = useRoute();
    console.log('value of route', route)
    slug.value = route.params.slug;
</script>