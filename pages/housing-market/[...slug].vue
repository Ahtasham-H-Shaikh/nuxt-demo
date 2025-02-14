<template>
    <div class="h-20">Navbar</div>
    <div class="">
        <HousingMarketBanner/>
        <p class="font-sans">Hello with poppins</p>
        <p v-for="(key, val) in jsonData">
            {{ jsonData[val] }}
            <br><br>
        </p>
    </div>
</template>
    
<script setup>
    definePageMeta({
        middleware: "auth"
    })
    const jsonData = useState('json').value;
    console.log(jsonData, 'json')
</script>