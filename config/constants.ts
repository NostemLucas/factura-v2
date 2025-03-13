export const useConstants = () => {
  const config = useRuntimeConfig();
  //console.log('CONFIG RUNTIME:', config);

  return {
    env: config.public.APP_ENV,
    api: config.public.API_URL,
  };
};
