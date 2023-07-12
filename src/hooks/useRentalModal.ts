import {create} from 'zustand'

interface RentalStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useRentalHook = create<RentalStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))

export default useRentalHook
