import {ofetch} from 'ofetch'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const token = useCookie('auth_token');
    const fetch = ofetch.create({
        baseURL:runtimeConfig.public.baseUrl,
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token.value}`
        },
        onRequestError:({ request, options, error })=>{
            console.log("Error inside the error plugin")
           if(error.cause === 401){
            token.value = null;
            // here we should implement the refresh token logic and handle the error if the refresh token is expired
            navigateTo('/login');
           }
        }
    })
    return {
        provide:{
            api:fetch
        }
    }
})