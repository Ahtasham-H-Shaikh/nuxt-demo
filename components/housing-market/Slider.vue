<template>
    <swiper
      :modules="[Navigation]"
      :slides-per-view="1"
      :space-between="50"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="my-swiper w-full"
    >
      <swiper-slide class="">
        <div class="slide-content">
          <img class="h-[235px] w-full object-cover" src="/property.png" alt="">
          <div class="bg-white p-3.5 ">
            <div class="flex justify-between py-1 px-2.5 border-[1.22px] rounded-full border-[#0000001A] w-fit items-center gap-1 ">
                <span class="h-3.5 w-3.5 bg-[#00B67B] rounded-full inline-block"></span>
                <p class="text-sm">Condo For Sale</p>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
          <img class="h-[235px] w-full object-cover" src="/property.png" alt="">
          <div class="bg-white "></div>
      </swiper-slide>
    </swiper>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css"; // Core Swiper styles
  import "swiper/css/navigation"; // Navigation buttons
  import { Navigation, } from "swiper/modules";
  
  // Sample slides
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
  </script>
  
