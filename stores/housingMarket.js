import { defineStore } from 'pinia'

export const useHousingMarketStore = defineStore('housingMarket', {
  state: () => ({
    jsonData: null
  }),
  actions: {
    setJsonData(data){
      this.jsonData = data;
    }
  }
})