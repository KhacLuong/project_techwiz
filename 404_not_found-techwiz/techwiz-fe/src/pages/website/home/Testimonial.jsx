import React from 'react';
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import {renderStar} from "../../../utils/helper.jsx";
import parse from "html-react-parser"

const Testimonial = () => {
    return (
        <>
            <section
                className={`bg-[url('/src/assets/image/wallpaper/testimonial-banner.png')] bg-fixed bg-center bg-no-repeat bg-cover pt-[100px] px-0 pb-[150px] relative`}>
                <div className={`bg-black opacity-20 absolute w-full h-full top-0 left-0`}></div>
                <div className={`xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full flex mx-auto relative`}>
                    <div className={`w-full`}>
                        <div
                            className={`content-center items-center justify-center p-[10px] flex relative w-full flex-wrap`}>
                            <div data-aos="fade-up"
                                 data-aos-delay={1000}
                                 className={`text-center justify-center mb-[20px] w-full uppercase before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-lightGreenColor before:w-8 flex items-center before:mr-3 before:mb-2`}>
                                <p className={`text-lg 2xs:text-xl 3xs:text-2xl sm:text-3xl leading-[1.2em] tracking-[1.5px] -mb-[10px] font-normal text-white pb-[15px] capitalize`}>Testimonials
                                    about us</p>
                            </div>
                            <div data-aos="fade-down"
                                 data-aos-delay={100} className={`mb-[20px] w-full`}>
                                <h2 className={`mb-[10px] text-3xl 2xs:text-4xl 3xs:text-5xl 2sm:text-6xl capitalize font-medium leading-[1.5em] text-white text-center`}>What
                                    Customers Said?</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`-mt-[120px] mb-0 bg-[#F5F7FC]`}>
                <div className={`xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full px-[15px] mx-auto md:mb-[2.5rem] mb-[1rem] flex`}>
                    <div className={`w-full relative min-h-[1px] flex`}>
                        <div className={`p-0 flex relative w-full flex-wrap content-start`}>
                            <div className={`w-full relative`}>
                                <Splide hasTrack={false}
                                        options={{
                                            type: 'loop',
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
                                                640: {perPage: 1}
                                            },
                                        }}>
                                    <SplideTrack>
                                        {
                                            testimonials.length > 0 && testimonials.map((item, index) => {
                                                return (
                                                    <SplideSlide data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                                                                 data-aos-delay={100} key={index}>
                                                        <div
                                                            className={`bg-white mt-0 mb-[15px] pt-0 pb-[40px] px-[20px] rounded-xl shadow-lg overflow-hidden relative flex flex-col justify-between`}>
                                                            <div className={`relative my-[30px] z-[2]`}>
                                                                <p title={item.content}
                                                                   className={`text-lg 3xs:text-xl sm:text-2xl text-black font-normal sm:line-clamp-4 line-clamp-6`}>
                                                                    {item.content}
                                                                </p>
                                                            </div>
                                                            <div className={`mt-8`}>
                                                                <div
                                                                    className={`flex justify-center 2xs:justify-between relative z-[2] text-[16px] whitespace-normal`}>
                                                                    <div
                                                                        className={`items-center flex justify-between flex-col 2xs:flex-row`}>
                                                                        <div className={`inline-flex`}>
                                                                            <img src={item.avatarPath}
                                                                                 alt={item.fullName}
                                                                                 className={`w-[80px] mr-0 2xs:mr-[20px] mb-0 max-w-full rounded-full aspect-square object-cover object-center-top`}/>
                                                                        </div>
                                                                        <span className={`text-center 2xs:text-left 3xs:mt-0 mt-4`}>
                                                                            <strong
                                                                                className={`text-black text-[14px] 3xs:text-[16px] font-normal leading-[1.2em] block`}>{item.fullName}</strong>
                                                                            <p className={`text-[#A1A1A1] text-[14px]`}>{item.job}</p>
                                                                            <div
                                                                                className={`flex mx-0 mt-[10px] items-center justify-center 2xs:justify-start`}>
                                                                                {
                                                                                    parse(renderStar(item.stars))
                                                                                }
                                                                            </div>
                                                                        </span>
                                                                    </div>
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
                        </div>
                    </div>
                </div>
                <svg className="hero-svg fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10"
                     preserveAspectRatio="none">
                    <path d="M0 10 0 0 A 90 59, 0, 0, 0, 100 0 L 100 10 Z"></path>
                </svg>
            </section>
        </>
    );
};
const testimonials = [
    {
        id: 1,
        avatarPath: "https://eprojectsem4.blob.core.windows.net/testimonials/testimonial-buuvivu.jpg",
        fullName: "Bui Vi Vu",
        job: "Blogger",
        content: "We are delighted with the garden – it has turned out fabulously. Love all the plants and the boys did a great job. Also the neighbours are all extremely impressed and have been over to inspect on numerous occasions!",
        stars: 5
    },
    {
        id: 2,
        avatarPath: "https://eprojectsem4.blob.core.windows.net/testimonials/testimonial-phi.jpg",
        fullName: "Nguyen Anh Phi",
        job: "CEO",
        content: "I am delighted. You and the team did a brilliant job. I was most impressed by the way you set about it and the result exceeds expectations. You reinforce my belief in getting experts to do the job.",
        stars: 4
    },
    {
        id: 3,
        avatarPath: "https://eprojectsem4.blob.core.windows.net/testimonials/testimonial-quynh.jpg",
        fullName: "Trang Nguyen",
        job: "Tester",
        content: "We are absolutely thrilled with the pruning. The garden looks more loved now and to see the wonderful shapes of the trees again makes such a difference. Hopefully it can be an annual event!",
        stars: 5
    },
    {
        id: 4,
        avatarPath: "https://eprojectsem4.blob.core.windows.net/testimonials/testimonial-tu-ngo.jpg",
        fullName: "Ngo Hoang Tu",
        job: "Happy Customer",
        content: "We wanted to say a very big thank you to you and all of the team for putting in our trees and plants. We are delighted and will definitely be in touch in a few months time to progress the rest of the planting.",
        stars: 5
    }
]
export default Testimonial;