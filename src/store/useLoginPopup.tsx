import { useState, useEffect } from 'react';

const useLoginPopup = () => {
    const [openLoginPopup, setOpenLoginPopup] = useState(false)

    const handleLoginPopup = () => {
        setOpenLoginPopup((toggleOpen) => !toggleOpen)
    }

    const handleCloseLoginPop=()=>{
        setOpenLoginPopup(false);
    }
    
    return {
        openLoginPopup,
        handleLoginPopup,handleCloseLoginPop
    }
}

export default useLoginPopup