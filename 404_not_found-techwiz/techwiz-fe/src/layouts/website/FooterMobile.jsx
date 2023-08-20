import React, {useContext} from 'react';
import {GoHome} from "react-icons/go";
import {FiUser} from "react-icons/fi";
import {BiHomeAlt2, BiUser} from "react-icons/bi";
import {AiOutlineHeart} from "react-icons/ai";
import {HiOutlineSearch} from "react-icons/hi";
import {Link} from "react-router-dom";
import {Context} from "../../context/ContextProvider.jsx";
import {PiArrowsInLineVerticalDuotone} from "react-icons/pi";

const FooterMobile = () => {
    const {setOpenSearch, isAuthenticated} = useContext(Context);
    return (
        <footer className={`lg:hidden block bg-white fixed bottom-0 w-full h-auto border-t-[1px] border-t-borderColor z-[99]`}>
            <div className={`w-full flex items-center h-full`}>
                <Link to={'/'} className={`flex items-center w-full justify-center flex-col border-r-[1px] border-r-borderColor py-5 text-darkColor`}>
                    <BiHomeAlt2 className={`w-9 h-9`}/>
                    <span className={`hidden 2xs:inline-block text-lg font-medium mt-2`}>Home</span>
                </Link>
                <Link to={`/account`} className={`flex items-center w-full justify-center flex-col border-r-[1px] border-r-borderColor py-5 text-darkColor`}>
                    <BiUser className={`w-9 h-9`}/>
                    <span className={`hidden 2xs:inline-block text-lg font-medium mt-2`}>Account</span>
                </Link>
                <div onClick={() => setOpenSearch(true)} className={`flex items-center w-full justify-center flex-col border-r-[1px] border-r-borderColor py-5 text-darkColor`}>
                    <HiOutlineSearch className={`w-9 h-9`}/>
                    <span className={`hidden 2xs:inline-block text-lg font-medium mt-2`}>Search</span>
                </div>
                {
                    isAuthenticated ? <Link to={`/v1/user/wishlist`} className={`flex items-center w-full justify-center flex-col border-r-[1px] border-r-borderColor py-5 text-darkColor`}>
                        <div className={`relative`}>
                            <AiOutlineHeart className={`w-9 h-9`}/>
                            <span
                                className={`absolute text-white bg-dangerColor-default_2 -top-3 -right-3 inline-flex w-7 h-7 items-center justify-center rounded-full`}>3</span>
                        </div>
                        <span className={`hidden 2xs:inline-block text-lg font-medium mt-2`}>Wishlist</span>
                    </Link> : <></>
                }
                <Link to={`/v1/user/compare`} className={`flex items-center w-full justify-center flex-col border-r-[1px] border-r-borderColor py-5 text-darkColor`}>
                    <PiArrowsInLineVerticalDuotone className={`w-9 h-9 rotate-45`}/>
                    <span className={`hidden 2xs:inline-block text-lg font-medium mt-2`}>
                        Compare
                    </span>
                </Link>
            </div>
        </footer>
    );
};

export default FooterMobile;