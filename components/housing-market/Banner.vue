<template>
    <div class="bg-gradient-to-r from-[rgba(145,199,249,0.35)] to-[rgba(255,255,255,0.7)] flex justify-center rounded-b-[36px]">
        <div class="flex justify-between max-w-[1351px] py-7 w-full">
            <div class="w-[612px]">
                <div class="relative mb-6">
                    <input class="w-full text-sm mb-6 rounded-full pb-3 pt-3 pl-4 pr-12 bg-[#FBFDFF] placeholder-[#666666] focus:border-blue-500 border-transparent border focus:outline-none" placeholder="Search by State" type="text">
                    <img class="absolute top-2 bottom-2 right-2" src="/searchIcon.png" />
                </div>
                <div class="mb-6">
                    <h1 class="font-bold text-6xl leading-16 mb-4 "><span class="text-[#0B5AA5] block">Florida</span>Housing Market</h1>
                    <p class="text-base leading-6 text-black">The landscape of Florida’s housing market evolves with shifting home prices and demand. Houzeo’s housing market report tracks constant changes in supply and demand across Florida. Our report offers real-time insights to help you make informed decisions.</p>
                </div>
                <div class="bg-white px-5 py-3 border border-[#0000001A] rounded-xl flex flex-col gap-3">
                    <h3 class="font-semibold text-xl">Buyer’s Market</h3>
                    <div class="flex justify-between">
                        <HousingMarketBannerCard/>
                        <div class="border-l border-dashed border-[#00000033] h-20 w-0 "></div>
                        <HousingMarketBannerCard/>
                    </div>
                </div>
            </div>
            <div class="w-[601px] bg-[#23486A] rounded-3xl flex flex-col gap-8 items-center justify-center pt-10 px-24 pb-4">
                <HousingMarketSlider/>
                <a class="font-medium text-base " href="">View 10,425 Homes for Sale in Florida</a>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>