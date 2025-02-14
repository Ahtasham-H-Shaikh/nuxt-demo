<template>
     <section class="w-full h-[620px] flex justify-center items-center bg-[rgba(145,199,249,0.5)] py-[25px] px-[15px] topBanner">
        <div class="w-full h-full max-w-[1280px] flex items-center">
            <div class="w-full max-w-[612px] leftCol">
                <searchBar />
                <h1 class="w-full flex flex-col text-[54px] leading-[60px] font-bold mt-[15px]">
                    <span class="text-[rgba(11,90,165,1)]">
                        Florida
                    </span>
                    Housing Market
                </h1>
                <p class="text-[#000] text-[16px] leading-[24px] mt-[15px]">
                    The landscape of Florida’s housing market evolves with shifting home prices and demand. Houzeo’s housing market report tracks constant changes in supply and demand across Florida. Our report offers real-time insights to help you make informed decisions.
                </p>
                <buyersMarketBox />
            </div>
        </div>
     </section>
</template>

<script setup>
    import searchBar from '~/components/housing-market-new/top-banner/searchBar.vue';
    import buyersMarketBox from '~/components/housing-market-new/top-banner/buyersMarketBox.vue';
</script>