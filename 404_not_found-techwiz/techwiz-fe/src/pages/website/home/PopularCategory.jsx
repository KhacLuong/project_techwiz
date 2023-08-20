import React from 'react';

const PopularCategory = () => {
    return (
        <section className={`w-full my-20`}>
            <div className={`flex flex-col items-center mx-auto relative`}>
                <div className={`xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full px-[15px] mx-auto whitespace-nowrap md:mb-[2.5rem] mb-[1rem]`}>
                    <span
                        className={`uppercase my-0 mx-auto ml-0 before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-lightGreenColor before:w-8 flex items-center before:mr-3 before:mb-1`}>
                         <p className={`text-lg 2xs:text-xl 3xs:text-2xl sm:text-3xl leading-[1.2em] tracking-[1.5px] -mb-[10px] font-semibold pb-[15px]`}>
                             Find your dream plants
                         </p>
                    </span>
                    <h2 className={`whitespace-normal 2xs:whitespace-nowrap text-3xl 2xs:text-4xl 3xs:text-5xl 2sm:text-6xl capitalize font-semibold leading-[1.5em] text-[#05162B]`}>
                        New Summer Collection</h2>
                </div>
                {/*<div className={`h-[600px] w-full md:w-full min-h-[1px] bg-white group/popular-schedule overflow-hidden`}>*/}

                {/*</div>*/}
            </div>
        </section>
    );
};

export default PopularCategory;