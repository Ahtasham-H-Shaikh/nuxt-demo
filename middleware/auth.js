export default defineNuxtRouteMiddleware(async (to) => {
    if(import.meta.server){
        const slug = to.params.slug || [];
        if(slug.length > 1){
            if(slug[1] === "") return
            throwErr()
        }

        if(slug.length === 1){
            let res = await $fetch(`http://localhost:3000/api/get-json-file?path=${slug[0]}`)
            if(res.statusCode === 404){
                throwErr()
            }
            useState("json", () => res.data)   
        }
    }
  });   

  function throwErr(){
    throw createError({
        message: "Page Not Found", 
        statusCode: 404,
    })
  }
