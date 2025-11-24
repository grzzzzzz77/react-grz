import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import type {IuserInfo} from '../types/user'

interface User {
    userName:string,
    phone:string,
    avatar:string,
    routes:[],
    setUserInfo:(userInfo:IuserInfo)=>void,
}

const useUserStore = create<User>()(
    immer(
        persist(((set) => ({
            userName:"",
            phone:"",
            avatar:"",
            routes:[],
            setUserInfo: (userInfo: IuserInfo) => {
                set({ ...userInfo });
            },
        })),{
            name:"user",
        }
    ))
)

export default useUserStore