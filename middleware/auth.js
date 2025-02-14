export default defineNuxtRouteMiddleware(async (to) => {
    if(import.meta.server){
        const slug = to.params.slug || [];
        console.log(slug)
    }
  });   
