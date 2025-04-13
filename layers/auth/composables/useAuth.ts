import useUserStore from "~/layers/auth/stores/user"
import type { LoginResponse,User,UserCreateInput,LoginInput,LoginOptions } from "../types/index"
export default function useAuth() {
    const userStore = useUserStore()
    const localeRoute = useLocaleRoute()
    const {$api} = useNuxtApp();
    const token = useCookie('auth_token',{
        maxAge: 60 * 60 * 24 * 20 // 20 days
    })
    const getAccessToken = async  (email:string,password:string) => {
        try {
            const response:LoginResponse = await $api('/auth/login',{
                method: 'POST',
                body:{
                    email,
                    password
                }
            })
            return response.access_token
        } catch (error) {
            console.error(error)
            handleError(error,{
                throw:true,
                withToast:false
            })
        }
    }
   
    const login = async (data:LoginInput) => {
        try {
            const tokenResponse = await getAccessToken(data.email,data.password)
            if (!tokenResponse) {
                throw new Error('Invalid credentials')
            }
            token.value = tokenResponse
            await getCurrentUser()
            navigateTo(localeRoute('/profile'))
        } catch (error) {
            console.error(error)
            handleError(error,{
                throw:false,
                withToast:true
            })
        }
    }

    const register = async (userCreateInput:UserCreateInput) => {
        try {
            const response:User = await $api('/users',{
                method: 'POST',
                body:{
                    ...userCreateInput
                }
            })
            const tokenResponse = await getAccessToken(userCreateInput.email,userCreateInput.password)
            if (!tokenResponse) {
                throw new Error('Invalid credentials')
            }
            token.value = tokenResponse
            userStore.setUser(response)
            navigateTo(localeRoute('/profile'))
        } catch (error) {
            console.error(error)
            handleError(error,{
                throw:false,
                withToast:true
            })
        }
    }

    const getCurrentUser = async () => {
        try {
            const response:User = await $api('/auth/profile')
            userStore.setUser(response)
        } catch (error) {
            console.error(error)
            handleError(error,{
                throw:false,
                withToast:true
            })
        }
    }

    const logout = async () => {
        token.value = null
        userStore.clearUser()
        navigateTo(localeRoute('/login'))
    }
    
    return {
        login,
        register,
        getCurrentUser,
        logout
    }
};