export default defineNuxtRouteMiddleware(async (to) => {
    console.log('hello from the middleware')
    const slug = to.params.slug || [];

    if (slug.length > 2) {
        return navigateTo('/404');
      }

    useState('stateName', () => slug[0] || null);
    useState('cityName', () => slug[1] || null);
    useState('isCityPassed', () => Boolean(slug[1]));
  });