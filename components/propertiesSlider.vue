<template>
    <swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="3.4"
    :space-between="32"
    :navigation="true"
    :pagination="{ clickable: true }"
    class="my-swiper w-full"
    >
        <swiper-slide v-for="property in properties" class="">
            <img class="w-[336px]" :src="property.Media[0].thumbnail" alt="">

        </swiper-slide>
    </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation buttons
import { Navigation, Pagination } from "swiper/modules";   

const props = defineProps(['properties'])
console.log('hello from child', props.properties)

</script>

<style>
    .swiper-button-prev, .swiper-button-next{
        width: 38px;
        height: 38px;
        background: white;
        border-radius: 50%;
        border: 0.86px solid #0B5AA5
    }

    .swiper-button-prev::after, .swiper-button-next::after{
        background-size: 7px 12px;
        background-repeat: no-repeat;
        width: 7px;
        height: 12px;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .swiper-button-prev::after{
        background-image: url('/back icon.svg');
    }

    .swiper-button-next::after{
        background-image: url("/next icon.svg");
    }


</style>