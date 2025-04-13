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
            console.log("Error inside the error plugin",error)
           if(error.message.includes('expired')){
            // in case of expired token the user should be logged out and navigated to the login page
            token.value = null;
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