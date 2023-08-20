import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetSellingProduct, selectProduct} from "../../../redux/slices/productSlice.jsx";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import ProductCard from "../../../components/ProductCard.jsx";

const SpecialProduct = () => {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const productSlice = useSelector(selectProduct)
    useEffect(() => {
        dispatch(fetchGetSellingProduct())
    }, [])
    useEffect(() => {
        if (productSlice && productSlice.length >= 0) {
            setProducts(productSlice)
        }
    }, [productSlice])


    return (
        <section className={`w-full my-20`}>
            <div className={`flex flex-col items-center mx-auto relative`}>
                <div
                    className={`xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[640px] 3xs:max-w-[480px] w-full px-[15px] mx-auto md:mb-[2.5rem] mb-[1rem]`}>
                    <div className={`mb-16`}>
                         <span
                             className={`uppercase my-0 mx-auto ml-0 before:content-[''] before:block before:border-b-0 before:border-t-[2px] before:border-t-lightGreenColor before:w-8 flex items-center before:mr-3 before:mb-1`}>
                         <p className={`text-lg 2xs:text-xl 3xs:text-2xl sm:text-3xl leading-[1.2em] tracking-[1.5px] -mb-[10px] font-semibold pb-[15px]`}>
                             New Summer Collection
                         </p>
                    </span>
                        <h2 className={`whitespace-normal 2xs:whitespace-nowrap text-3xl 2xs:text-4xl 3xs:text-5xl 2sm:text-6xl capitalize font-semibold leading-[1.5em] text-[#05162B]`}>
                            Trending Product
                        </h2>
                    </div>
                    <div className={`w-full`}>
                        <Splide hasTrack={false}
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
                                        640: {perPage: 1}
                                    },
                                }}>
                            <SplideTrack>
                                {
                                    products.length > 0 && products.map((item, index) => {
                                        return (
                                            <SplideSlide key={index}
                                                         data-aos={"fade-up"}
                                                         data-aos-delay={index * 100}>
                                                <ProductCard product={item} gridCols={3}/>
                                            </SplideSlide>
                                        )
                                    })
                                }
                            </SplideTrack>
                        </Splide>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialProduct;