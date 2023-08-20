import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../context/ContextProvider.jsx";

const Overlay = () => {
    const {showNavMobile, setShowNavMobile, openCartModal , setOpenCartModal, openLoginModal, setOpenLoginModal} = useContext(Context);
    const handleDisableOverlay = () => {
        setShowNavMobile(false)
        setOpenCartModal(false)
        setOpenLoginModal(false)
    }

    return (
        <div onClick={handleDisableOverlay}
             style={{
                 animationName: 'fadeIn',
                 animationDuration: '300ms',
                 animationTimingFunction: 'linear'
             }}
            className={`${showNavMobile || openCartModal || openLoginModal ? 'block' : 'hidden'} overlay top-0 left-0 right-0 bottom-0 z-[100] bg-[#0000005d] fixed`}></div>
    )
};

export default Overlay;