<template>
    <swiper
      :modules="[Navigation, Pagination]"
      :slides-per-view="1"
      :space-between="50"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="my-swiper w-full"
    >
      <swiper-slide class="">
        <div class="slide-content">
          <img class="h-[235px] w-full object-cover" src="/property.png" alt="">
          <div class="bg-white ">
            <div>
                <div>
                    <div class="bg-[#00B67B] h-3.5 w-3.5"></div>
                </div>
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
  import "swiper/css/pagination"; // Pagination dots
  import { Navigation, Pagination } from "swiper/modules";
  
  // Sample slides
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
  </script>
  
