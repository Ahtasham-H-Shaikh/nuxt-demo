<template>
    <section class="">
        <div class="max-w-[1272px]">
            <h2 class="font-semibold text-4xl leading-[1.5]">Florida’s Latest Listings</h2>
            <PropertiesSlider :properties="data.data.properties" />
        </div>
    </section>
</template>

<script setup>
import { useHousingMarketStore } from '../../stores/housingMarket';

    let store = useHousingMarketStore()

    let url = `${import.meta.env.VITE_IDX_URL}/GetPropertyList`
    let options = {
        "filters": {
            "StandardStatus": [
            "for-sale"
            ],
            "PropertySubType": [
            "single-family",
            "multi-family",
            "townhouse",
            "condominium",
            "land",
            "manufactured"
            ],
            "SaleTypes": [],
            "Features": [],
            "ListingTypes": [],
            "BedroomsTotal": -1,
            "BathroomsTotal": -1,
            "IsExactBedroomMatch": false,
            "OrderBy": "homes_for_you",
            "PostalCode": "null",
            "City": "null",
            "StateOrProvince": `${store.jsonData.initial}`,
            "ListAgentOfficeName": "null",
            "ListPrice": {
            "Min": -1,
            "Max": -1
            },
            "LivingArea": {
            "Min": -1,
            "Max": -1
            },
            "ListPricePerSqFt": {
            "Min": -1,
            "Max": -1
            },
            "LotSizeAcres": {
            "Min": -1,
            "Max": -1
            },
            "YearBuilt": {
            "Min": -1,
            "Max": -1
            },
            "AssociationFee": -1,
            "DaysOnMarket": -1,
            "GeoBoundary": {
            "North": 0,
            "East": 0,
            "West": 0,
            "South": 0
            },
            "PropertyAttributesURL": "string"
        },
        "page_no": 1,
        "listing_limit": 1,
        "device_type": 0
        }
    let data = await $fetch(url, {
        body: options,
        method: 'POST'
    })
</script>