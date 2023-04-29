'use client';
import { useEffect, useState } from "react"
import ClientLoading from "./ClientLoading";

interface ClientOnlyProps {
    children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(()=>{
        setHasMounted(true)
    },[])

    
    if(!hasMounted){
        return <div className="bg-white w-full h-full absolute t-0 l-0 flex justify-center items-center">
            <ClientLoading />
        </div>
    }
    return (
        <>
          {children}
        </>
    )
}

export default ClientOnly