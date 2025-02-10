async function fetchNewLocationData(state, city) {
    const config = useRuntimeConfig(); 
    const backendUrl = config.public.backendUrl;
    try {
        let rawRes = await fetch(`${backendUrl}/api/col-city-state-data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: state,
                city: city
            })
        });
        let res = await rawRes.json();

        return res;
    } catch (e) {
        console.log("error fetching new data", e);
    }
}

export default defineNuxtRouteMiddleware(async (to) => {
    const slug = to.params.slug || [];

    if (slug.length > 2) {
        throw createError({ statusCode: 404, message: 'Page Not Found' });
    }
    else if(slug.length === 0){
        return navigateTo('/cost-of-living/florida')
    }
    let res = await fetchNewLocationData(slug[0], slug?.[1])
    if(!res.data.stateData?.length){
        throw createError({ statusCode: 404, message: 'Page Not Found' });
    }
    if((slug[0].toLowerCase() !== 'florida' && res.data.stateData[0].state_name.toLowerCase() === 'fl') ){
        throw createError({ statusCode: 404, message: 'Page Not Found' });
        console.log('redirecting')
    }


    useState('stateName', () => slug[0] || null);
    useState('cityName', () => slug[1] || null);
    useState('isCityPassed', () => Boolean(slug[1]));
  });   

