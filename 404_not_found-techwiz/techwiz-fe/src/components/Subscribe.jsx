import React from 'react';
import imgSubscribe from '../assets/image/wallpaper/subscribe-banner.png'
import {HiOutlineMail} from "react-icons/hi";
import {MdSecurity} from "react-icons/md";
import {IoIosSend} from "react-icons/io";

const Subscribe = () => {
    return (
        <section className={`bg-scroll bg-[#ffffff] bg-repeat w-full px-[15px] mx-auto bg-[url('/src/assets/image/wallpaper/subscribe-banner.png')]`}>
            <div className={`-mx-[15px]`}>
                <div className={`lg:py-[55px] py-[40px] text-center w-full opacity-100`}>
                    <div className={`w-full`}>
                        <div className={`w-full 3xs:w-full text-center 2sm:w-full relative min-h-[1px] px-[15px]`}>
                            <h2 className={`bg-none text-[#000000] font-medium text-3xl 2xs:text-4xl 3xs:text-5xl 2sm:text-6xl pt-[60px] relative capitalize float-none inline-block align-top w-full before:absolute before:content-[''] before:bg-[url('/src/assets/image/sprite2.png')] before:left-0 before:right-0 before:my-0 before:mx-auto before:top-0 before:h-[65px] before:w-[65px] before:[background-position-x:-23px] before:[background-position-y:-636px] before:bg-repeat before:bg-scroll`}>Sign Up For Newsletter</h2>
                            <div className={`text-[#555555] italic font-normal text-lg 2xs:text-xl 3xs:text-2xl sm:text-3xl 2sm:mt-[15px] mt-2.5 text-center align-top w-full`}>Wants to get latest updates! sign up for free.</div>
                        </div>
                        <div className={`inline-block mt-10 px-[15px] text-center md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full align-top`}>
                            <div className={`relative text-clip w-full`}>
                                <form className={``}>
                                    <input type={`text`} placeholder={`Your email address`} className={`bg-white border-[1px] border-borderColor text-[#222222] font-light text-2xl block 3xs:p-[0_130px_0_15px] p-[0_60px_0_15px] w-full h-[42px] m-0 rounded-[25px]`}/>
                                    <a href={`#`} className={`align-middle absolute top-0 capitalize right-0 py-1.5 px-5 items-center justify-center h-[42px] font-light text-2xl border-[1px] text-center border-[#222222] bg-[#222222] text-white inline-flex rounded-[25px] hover:bg-lightGreenColor hover:border-lightGreenColor duration-300`}>
                                        <span className={`3xs:block hidden`}>Subscribe</span>
                                        <IoIosSend className={`w-7 h-7 3xs:hidden block`}/>
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;