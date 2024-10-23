export const createChatSlice = (set) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessage: [],
    
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    
    setSelectedChatData: (selectedChatData) =>
      set({ selectedChatData }), // Wrap selectedChatData inside an object
    
    setSelectedChatMessage: (selectedChatMessage) =>
      set({ selectedChatMessage }), // Wrap selectedChatMessage inside an object
    
    closeChat: () =>
      set({
        selectedChatData: undefined,
        selectedChatType: undefined,
        selectedChatMessage: [],
      }),
  });
  