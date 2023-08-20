import React from 'react';
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import banner1 from "../../../assets/image/wallpaper/banner-1.png"
import banner2 from "../../../assets/image/wallpaper/banner-2.png"
import banner3 from "../../../assets/image/wallpaper/banner-3.png"
import banner4 from "../../../assets/image/wallpaper/banner-4.png"
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {Link} from "react-router-dom";

const Banner = () => {
    return (
        <section className={`min-h-[1px] group/banner overflow-hidden`}>
            <Splide hasTrack={false}
                    options={{
                        type: 'fade',
                        lazyLoad: 'nearby',
                        perPage: 1,
                        perMove: 1,
                        autoplay: true,
                        rewind: true,
                        interval: 8000,
                        focus: 0,
                        omitEnd: true,
                        pagination: true,
                        // classes: {
                        //     arrows: 'splide__arrows splide__arrows_banner',
                        // },
                        breakpoints: {
                            480: {arrows: false},
                        },
                        // direction: 'ttb',
                        // height   : '100vh',
                        // wheel    : true,
                    }}>
                <SplideTrack>
                    {
                        bannerData.length > 0 && bannerData.map((item, index) => {
                            return (
                                <SplideSlide key={index}>
                                    <div className={`relative w-full h-screen`}>
                                        <img src={item.imagePath} alt={`banner`} className={`w-full h-full object-cover`}/>
                                        <div
                                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center`}>
                                            <div
                                                className={`xl:text-7xl text-5xl leading-[46px] text-white mb-8 font-light whitespace-nowrap`}>
                                                {
                                                    item.title
                                                }
                                            </div>
                                            <div
                                                className={`xl:text-8xl text-6xl text-white mb-8 font-semibold xl:whitespace-nowrap text-center`}>
                                                {
                                                    item.sub
                                                }
                                            </div>
                                            <div className={`mt-12 relative`}>
                                                <Link to={`v1/products`} className={`hover:bg-lightGreenColor bg:white text-white font-medium cursor-pointer inline-flex uppercase border-2 border-white hover:border-lightGreenColor py-6 px-8 items-center justify-center text-2xl duration-300`}>
                                                    Shop All Plants
                                                </Link>
                                                <span className={`absolute z-10 top-0 left-0 right-0 bottom-0 bg-bgWhiteColor opacity-50`}></span>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                            )
                        })
                    }
                </SplideTrack>
                <div className="splide__arrows_banner splide__arrows">
                    <button
                        className="splide__arrow splide__arrow_banner opacity-0 splide__arrow--prev rotate-180 ml-2 rounded text-lg -translate-x-[100px]  group-hover/banner:translate-x-[0px] group-hover/banner:opacity-60 duration-500 transition-all h-32 w-14 -translate-y-1/2 bg-[#ffffff]">
                        <MdKeyboardArrowLeft className={`w-12 h-12 text-black`}/>
                    </button>
                    <button
                        className="splide__arrow splide__arrow_banner opacity-0 splide__arrow--next mr-2 rounded text-lg translate-x-[100px] group-hover/banner:translate-x-[0px] group-hover/banner:opacity-60 duration-500 transition-all h-32 w-14 -translate-y-1/2 bg-[#ffffff]">
                        <MdKeyboardArrowRight className={`w-12 h-12`}/>
                    </button>
                </div>
            </Splide>
        </section>
    );
};
const bannerData = [
    {
        id: 1,
        imagePath: banner3,
        title: 'Get upto 35% Off',
        sub: 'New Collection',
    },
    {
        id: 2,
        imagePath: banner2,
        title: 'on Garden Look',
        sub: 'Nutrients plants 2018',
    },
    {
        id: 3,
        imagePath: banner4,
        title: 'Flat 40% Discount',
        sub: 'Different Lush Artificial Green Wall',
    },
    {
        id: 4,
        imagePath: banner1,
        title: 'Flat 50% Discount',
        sub: 'Summer Garden Cactus Plants',
    }
]
export default Banner;