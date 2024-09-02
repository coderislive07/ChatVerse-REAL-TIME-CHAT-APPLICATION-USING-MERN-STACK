export const createAuthSlice=(set)=>(
    {
        userInfo:null,
        setUserInfo:(userInfo)=> set({userInfo}),
        hasProfile:false,
        setHasProfile: (hasProfile) => set({ hasProfile }),
    }
)