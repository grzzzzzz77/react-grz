import { create } from 'zustand';
export const useStore = create<{
    userInfo: any;
}>((set) => ({
    userInfo: {
        _id: '',
        userId: 0,
        userName: '',
        userEmail: '',
        deptId: '',
        state: 0,
        mobile: '',
        job: '',
        role: 0,
        roleList: '',
        createId: 0,
        deptName: '',
        userImg: '',
    },
}));
