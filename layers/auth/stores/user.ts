import type { User } from "../types";

const userStore = defineStore('user',()=>{
    const user = ref<User | null>(null);
    const setUser = (userData:User)=>{
        user.value = userData;
    }
    const clearUser = ()=>{
        user.value = null;
    }
    return {user,setUser,clearUser};
},{
    persist:true
})

export default userStore;