import React, {useContext} from 'react';
import {IoIosArrowUp} from "react-icons/io";
import useScrollPosition from "../hooks/useScrollPosition.jsx";

const ScrollToTop = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const scrollPosition = useScrollPosition();
    return (
        <div onClick={handleScrollToTop} className={`${scrollPosition > 50 ? 'block' : 'hidden'} lg:bottom-12 2xs:bottom-32 fixed bottom-24 lg:right-12 right-8 rounded-full w-16 h-16 flex items-center justify-center bg-lightGreenColor text-white cursor-pointer hover:bg-successColor duration-300 z-[98]`}>
            <IoIosArrowUp className={`w-9 h-9`}/>
        </div>
    );
};

export default ScrollToTop;