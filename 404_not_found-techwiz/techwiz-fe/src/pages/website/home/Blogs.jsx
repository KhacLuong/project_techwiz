import React from 'react';
import blog_1 from "../../../assets/image/blog/blog-1/img-1.jpg"
import blog_2 from "../../../assets/image/blog/blog-2/img-2.jpg"
import blog_3 from "../../../assets/image/blog/blog-3/img-3.jpg"
import blog_4 from "../../../assets/image/blog/blog-4/img-4.png"
import {MdCalendarMonth, MdOutlinePersonOutline} from "react-icons/md";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";

const News = () => {
    return (
        <section className={`w-full my-20`}>
            <div className={`flex flex-col items-center mx-auto relative before:content-[''] before:opacity-[0.2] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-[1] before:bg-[url('/src/assets/image/color-bg.png')]`}>
                <div className={`xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full px-[15px] mx-auto whitespace-nowrap md:mb-[2.5rem] mb-[1rem]`}>
                    <span
                        className={`uppercase my-0 mx-auto ml-0 before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-lightGreenColor before:w-8 flex items-center before:mr-3 before:mb-1`}>
                         <p className={`text-lg 2xs:text-xl 3xs:text-2xl sm:text-3xl leading-[1.2em] tracking-[1.5px] -mb-[10px] font-semibold pb-[15px]`}>
                             News and Tips
                         </p>
                    </span>
                    <h2 className={`text-3xl 2xs:text-4xl 3xs:text-5xl 2sm:text-6xl capitalize font-semibold leading-[1.5em] text-[#05162B]`}>
                        From Our Blog</h2>
                </div>
                <Splide className={`mx-auto flex flex-wrap xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full sm:px-[15px] md:mb-[2.5rem] mb-[1rem]`} hasTrack={false}
                        options={{
                            type: 'slide',
                            lazyLoad: 'nearby',
                            perPage: 4,
                            perMove: 1,
                            autoplay: true,
                            interval: 5000,
                            focus: 0,
                            omitEnd: true,
                            pagination: false,
                            arrows: false,
                            cover: true,
                            gap: '2rem',
                            breakpoints: {
                                1280: {perPage: 3},
                                1024: {perPage: 2},
                                640: {perPage: 1, padding: '10px'}
                            },
                        }}>
                    <SplideTrack>
                        {
                            blogs.map((item, index) => {
                                return (
                                    <SplideSlide  key={index}
                                                  data-aos={index % 2 !== 0 ? 'fade-up' : 'fade-down'}
                                                  data-aos-delay={index*100} className={`relative bg-white`}>
                                        <div
                                            className={`last:pr-0 group/news my-10 w-full`}>
                                            <div className={`rounded-2xl relative w-full p-3 shadow-lg flex flex-col min-w-0`}>
                                                <div className={`overflow-hidden rounded relative cursor-pointer`}>
                                                    <div
                                                        className={` transition-all duration-300 pb-[calc(0.715*100%)] relative overflow-hidden top-0 left-0 right-0 bottom-0 w-full `}>
                                                        <img alt={``} src={item.imagePath}
                                                             className={`object-cover absolute top-0 left-0 right-0 bottom-0 scale-[1.01] align-middle block w-full h-full transition-all duration-300 rounded-2xl group-hover/news:scale-[1.05]`}/>
                                                    </div>
                                                    <div
                                                        className={`bg-black absolute w-full h-full top-0 left-0 invisible opacity-0 group-hover/news:opacity-40 group-hover/news:visible transition-all duration-500`}></div>
                                                    <div
                                                        className={`translate-y-[50px] absolute bottom-0 left-0 rounded-md py-[0.7em] px-[1.5em] bg-lightGreenColor ml-[1rem] mr-[1rem] mb-[1rem] inline-block text-[0.75em] font-bold leading-none text-white whitespace-nowrap align-baseline invisible opacity-0 group-hover/news:opacity-100 group-hover/news:visible group-hover/news:translate-y-[0px] transition-all duration-500`}>
                                                        <span className={`text-[1.4rem] text-white font-medium`}>{item.type}</span>
                                                    </div>
                                                </div>
                                                <div className={`relative min-h-[1px] pt-[1rem] px-[0.5rem]`}>
                                                    <ul className={`cursor-pointer -mx-[0.75rem] mb-[1.2rem] flex flex-wrap flex-col 2xs:flex-row`}>
                                                        <li className={`px-[0.75rem]`}>
                                                            <a className={`text-[#77838f] flex items-center`}>
                                                                <div className={`mr-[0.5rem] flex`}>
                                                                    <MdOutlinePersonOutline className={`w-5 h-5`}/>
                                                                </div>
                                                                <div className={`text-[1.2rem]`}>{item.author}</div>
                                                            </a>
                                                        </li>
                                                        <li className={`px-[0.75rem]`}>
                                                            <a className={`text-[#77838f] flex items-center`}>
                                                                <div className={`mr-[0.5rem] flex`}>
                                                                    <MdCalendarMonth className={`w-5 h-5`}/>
                                                                </div>
                                                                <div className={`text-[1.2rem]`}>{item.publishDate}</div>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <a className={`block cursor-pointer`}>
                                                        <h5 className={`line-clamp-3  leading-normal text-[14px] mb-[0.9rem] font-medium text-[#2f2d51]`}>
                                                            {item.title}
                                                        </h5>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </SplideSlide>
                                )
                            })
                        }
                    </SplideTrack>
                </Splide>
            </div>
        </section>
    );
};
const blogs = [
    {
        id: 1,
        publishDate: "July 20, 2023",
        type: "Blog",
        author: "Duc Anh",
        title: "How to Plant a Succulent.",
        imagePath: blog_1
    },
    {
        id: 2,
        publishDate: "July 05, 2023",
        type: "Blog",
        author: "Linh Nguyen",
        title: "The 10 Best Succulents You Can Grow Indoors.",
        imagePath: blog_2
    },
    {
        id: 3,
        publishDate: "May 22, 2023",
        type: "Blog",
        author: "Khac Luong",
        title: "Our Picks: Low Light Plants.",
        imagePath: blog_3
    },
    {
        id: 4,
        publishDate: "May 18, 2023",
        type: "Blog",
        author: "Thanh Phong",
        title: "By killing trees, we are killing ourselves too.",
        imagePath: blog_4
    }
]
export default News;