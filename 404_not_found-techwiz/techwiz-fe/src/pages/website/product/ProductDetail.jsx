import React, {useContext, useEffect, useRef, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import BannerComponent from "../../../components/BannerComponent.jsx";
import {FINAL_URL_CUSTOMER} from "../../../utils/setting-data.jsx";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import {useDispatch} from "react-redux";
import {fetchGetProductDetail} from "../../../redux/slices/productSlice.jsx";
import parse from "html-react-parser";
import {handleFormatPriceToUSD, renderStar} from "../../../utils/helper.jsx";
import {PiArrowsInLineVerticalDuotone, PiArrowsOutLineVerticalDuotone, PiCheckFatFill} from "react-icons/pi";
import {toast} from "react-toastify";
import {HiOutlineMinusSm} from "react-icons/hi";
import {FiPlus} from "react-icons/fi";
import {BsFillCartFill, BsFillSuitHeartFill} from "react-icons/bs";
import {LiaShippingFastSolid} from "react-icons/lia";
import {MdOutlineDiscount} from "react-icons/md";
import {AiOutlineHeart, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {Context} from "../../../context/ContextProvider.jsx";
import moment from "moment";
import produce from "immer";

const ProductDetail = () => {
    const {compareProducts, dispatchCompare, isAuthenticated, setOpenCartModal, dispatchCart} = useContext(Context);
    const {slug} = useParams()
    const location = useLocation()
    const mainRef = useRef(null);
    const thumbsRef = useRef(null);
    const [product, setProduct] = useState({})
    const dispatch = useDispatch()
    const [count, setCount] = useState(1);
    const [openPolicy, setOpenPolicy] = useState([])
    let isAdded = false

    useEffect(() => {
        isAdded = compareProducts.products.some(item => item.id === location?.state?.id);
    }, [compareProducts])

    useEffect(() => {
        if (mainRef.current && thumbsRef.current && mainRef.current.splide && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
            thumbsRef.current.sync(mainRef.current.splide);
        }
    }, [location.state.id])

    useEffect(() => {
        const test = async () => {
            await handleGetProductDetail()
        }
        test()
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])

    const [listCheckedColor, setListCheckedColor] = useState([])
    const [listCheckedSize, setListCheckedSize] = useState([])
    const handleSelectColor = (color) => {
        setListCheckedColor(prevState => {
            if (listCheckedColor.includes(color)) {
                return prevState.filter(newColor => newColor !== color)
            } else {
                return [...prevState, color]
            }
        })
    }
    const handleSelectSize = (size) => {
        setListCheckedSize(prevState => {
            if (listCheckedSize.includes(size)) {
                return prevState.filter(newColor => newColor !== size)
            } else {
                return [...prevState, size]
            }
        })
    }
    const handleOnChangeQuantity = (count) => {
        if (typeof (count) === "object") {
            setCount(parseInt(count.target.value));
        } else {
            setCount(count)
        }
    }
    const handleMinusCount = (e) => {
        e.preventDefault();
        let minus = count - 1
        handleOnChangeQuantity(minus)
        if (minus < 1) {
            minus = 1
            handleOnChangeQuantity(minus)
            toast.error('Must choose at least one product')
        }
    }
    const handlePlusCount = (e) => {
        e.preventDefault();
        let plus = count + 1
        handleOnChangeQuantity(plus)
        if (plus > 10) {
            plus = 10
            handleOnChangeQuantity(plus)
            toast.error('You can only buy up to 10 products')
        }
    }
    const handleOnKeyUp = (e) => {
        const number = parseInt(e.target.value)
        if (number > 10) {
            toast.error('You can only buy up to 10 products')
            setCount(10)
        } else if (number < 1) {
            toast.error('Must choose at least one product')
            setCount(1)
        } else {
            setCount(number)
        }
    }
    const handleOpenPolicy = (policyId) => {
        setOpenPolicy(prevState => {
            if (prevState.includes(policyId)) {
                return prevState.filter(id => id !== policyId)
            } else {
                return [...prevState, policyId]
            }
        })
    }
    const handleGetProductDetail = async () => {
        const res = await dispatch(fetchGetProductDetail({id: location.state.id})).unwrap()
        if (res && res.code === 200) {

            const currentDate = moment();
            const nextState = produce({}, draft => {
                draft.productName = res.data.productName
                draft.priceDefault = Math.min(...res.data?.productInfos.map(item => item.price))
                draft.sale = false
                draft.priceAfterSale = 0
                draft.hot = res.data.hot
                draft.id = res.data.id
                draft.type = res.data.type
                draft.slug = res.data.slug
                draft.imagePath = res.data.imagePath
                draft.brand = res.data.brand
                draft.category = res.data.category
                draft.summary = res.data.summary
                draft.productInfos = res.data.productInfos
                draft.tags = res.data.tags
                draft.sku = res.data.sku
                draft.new = currentDate.diff(moment(res.data.createdAt), 'days') < 7
                draft.outOfStock = res.data.productInfos.every(item => item.quantity < 0)
                draft.star = 5
                draft.thumbnails = res.data.productThumbnails
                draft.imagePath = res.data.imagePath
                draft.productCode = res.data.productCode
                draft.content = res.data.content
            })
            setProduct(nextState)
        }
    }
    const handleAddProductToCompare = (product) => {
        dispatchCompare({type: isAdded ? 'REMOVE' : 'ADD', payload: product})
        if (isAdded) {
            toast.error("Remove product from compare list")
        } else {
            toast.success("Product added to compare list")
        }
    }
    const handleAddProductToWishList = (product) => {

    }
    const handleAddProductToCart = (product, count, outOfStock) => {
        if (listCheckedColor.length === 0 || listCheckedSize.length === 0) {
            setOpenCartModal(false);
            toast.error('Must choose color and size of product')
        } else {
            if (!count) {
                setOpenCartModal(false);
                toast.error('Must choose at least one product')
                return
            }
            if (outOfStock) {
                setOpenCartModal(false);
                toast.error('The remaining quantity of products is not enough')
            } else {
                for (let i = 0; i < count; i++) {
                    dispatchCart({type: 'ADD', payload: {data: product}})
                }
                setOpenCartModal(true);

            }
        }

    }
    return (
        <>
            <BannerComponent listBreadcrumb={listBreadcrumb(location.state.productName)}/>
            <section className={`w-full mt-[40px] p-0`}>
                <div className={`max-w-[1280px] md:px-[15px] mx-auto my-0`}>
                    <div className={`info w-full p-0`}>
                        <div className={`md:px-[15px] max-w-[1280px] mx-auto px-[15px]`}>
                            <div className={`m-0 w-full flex flex-wrap`}>
                                <div
                                    className={`w-full md:w-[45%] md:pr-[40px] float-left text-center max-w-full pb-[40px] grow-0 shrink-0`}>
                                    <div className={`sticky top-[3rem] z-10`}>
                                        <div className={``}>
                                            <Splide hasTrack={false}
                                                    className={`main-slide`}
                                                    ref={mainRef}
                                                    options={mainOptions}>
                                                <SplideTrack>
                                                    {
                                                        product?.thumbnails
                                                        && product?.thumbnails?.length > 0
                                                        && product?.thumbnails.map((thumbnail, index) => {
                                                            return (
                                                                <SplideSlide key={index}>
                                                                    <div className={`z-0 relative`}>
                                                                        <img src={thumbnail.imagePath}
                                                                             alt={thumbnail.title}
                                                                             className={`w-full h-full object-contain`}/>
                                                                    </div>
                                                                </SplideSlide>
                                                            )
                                                        })
                                                    }
                                                </SplideTrack>
                                            </Splide>
                                            <Splide hasTrack={false}
                                                    ref={thumbsRef}
                                                    options={thumbsOptions}>
                                                <SplideTrack className={`mt-3`}>
                                                    {product?.thumbnails?.length > 0 && product?.thumbnails.map((thumbnail, index) => (
                                                        <SplideSlide key={index}
                                                                     className={`relative`}>
                                                            <div className={`w-full aspect-square`}>
                                                                <img src={thumbnail.imagePath}
                                                                     alt={thumbnail.title}
                                                                     className={`w-full h-full object-cover`}/>
                                                            </div>
                                                        </SplideSlide>
                                                    ))}
                                                </SplideTrack>
                                            </Splide>
                                        </div>
                                    </div>
                                </div>
                                <div className={`w-full md:w-[55%] md:pl-[40px] max-w-full`}>
                                    <div className={`md:sticky md:top-[3rem] md:float-left md:z-10 w-full`}>
                                        <div className={`md:mt-0 float-left w-full mb-6 flex items-center`}>
                                            <span className={`relative font-semibold mr-2 flex items-center`}>4.2 <span
                                                className={`ml-4 text-3xl`}>•</span></span>
                                            <span className={`flex`}>
                                                 {
                                                     parse(renderStar(product?.star))
                                                 }
                                            </span>
                                            <p className={`ml-2`}>(1 reviews)</p>
                                        </div>
                                        <h1 className={`flex items-center break-words text-5xl font-medium capitalize my-2 float-left w-full`}>
                                            {
                                                product?.productName
                                            }
                                            <div
                                                className={`flex ml-8`}>
                                                {
                                                    !product.outOfStock && product.sale && (
                                                        <div
                                                            className={`px-8 py-2 text-2xl flex items-center justify-center bg-dangerColor-default_2 text-white`}>Sale</div>
                                                    )
                                                }
                                                {
                                                    !product.outOfStock && product.hot && (
                                                        <div
                                                            className={`px-8 py-2 text-2xl flex items-center justify-center bg-warningColor text-white`}>Hot</div>
                                                    )
                                                }
                                                {
                                                    !product.outOfStock && product.new && (
                                                        <div
                                                            className={`px-8 py-2 text-2xl flex items-center justify-center bg-lightGreenColor text-white`}>New</div>
                                                    )
                                                }
                                            </div>
                                        </h1>
                                        <div className={`float-left w-full my-6`}>
                                            <div className={`font-bold text-lightGreenColor text-4xl`}>
                                                <div className={`flex flex-row items-center`}>
                                                    {
                                                        product.sale && (
                                                            <span
                                                                className={` mr-4 text-dangerColor-default_2`}>{handleFormatPriceToUSD(product.priceAfterSale)}</span>
                                                        )
                                                    }
                                                    <span
                                                        className={`${product.sale ? 'text-[#777777] line-through font-light italic' : 'text-lightGreenColor'}`}>{handleFormatPriceToUSD(product.priceDefault)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`my-2 w-full float-left border-b-[1px] border-borderColor pb-[14px]`}>
                                            {product?.summary}
                                        </div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Category</span>: {product?.category?.categoryName}
                                        </div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Type</span>: {product?.type?.typeName}
                                        </div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Brand</span>: {product?.brand?.brandName}
                                        </div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Sku</span>: {product?.sku}
                                        </div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Availability</span>:
                                            {product?.outOfStock ? ' Out of Stock' : ' In Stock'}
                                        </div>
                                        {
                                            product?.tags && product?.tags.length > 0 && (
                                                <div className={`my-2 float-left w-full`}>
                                                    <span
                                                        className={`capitalize inline-block min-w-[110px] font-medium`}>
                                                        Tags
                                                    </span> :
                                                    {
                                                        product?.tags.map((item, index) => {

                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                        <div
                                            className={`border-b-borderColor border-b-[1px] w-full float-left my-4`}></div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Color</span>
                                            <div className={`flex items-center flex-row flex-wrap mt-4`}>
                                                {
                                                    product?.productInfos?.length > 0 && product?.productInfos?.map((item, index) => (
                                                        <div key={index}
                                                             onClick={() => handleSelectColor(item.color)}
                                                             className={`group/color relative w-16 h-16 mr-3 mb-4 ${item.color === 'BLUE' ? 'bg-blue-600' : item.color === 'BROWN' ? 'bg-amber-600' : item.color === 'WHITE' ? 'bg-white' : item.color === 'YELLOW' ? 'bg-yellow-400' : item.color === 'RED' ? 'bg-red-500' : item.color === 'PINK' ? 'bg-pink-400' : item.color === 'GREEN' ? 'bg-green-600' : 'bg-gray-500'} rounded-full border-[1px] border-borderColor cursor-pointer flex items-center justify-center`}>
                                                            {
                                                                listCheckedColor.includes(item.color) &&
                                                                <PiCheckFatFill
                                                                    className={`w-7 h-7 ${item.color === 'WHITE' ? 'text-black' : 'text-white'}`}/>
                                                            }
                                                            <span
                                                                className={`group-hover/color:visible group-hover/color:opacity-100 group-hover/color:top-1/2 duration-500 transition-all absolute opacity-0 invisible top-0 z-30 right-1/2 translate-x-1/2 translate-y-[-60px] p-[4px_12px] bg-darkColor text-white rounded-lg before:content-[''] before:absolute before:-bottom-[4px] before:right-1/2 before:translate-x-1/2 before:z-10 before:rotate-45 before:w-4 before:h-4 before:bg-darkColor`}>{item.color}
                                                        </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={`my-2 float-left w-full`}>
                                            <span
                                                className={`capitalize inline-block min-w-[110px] font-medium`}>Size</span>
                                            <div className={`flex items-center flex-row flex-wrap mt-4`}>
                                                {
                                                    product?.productInfos?.length > 0 && product?.productInfos?.map((item, index) => (
                                                        <div key={index}
                                                             onClick={() => handleSelectSize(item.size)}
                                                             className={`group/color relative w-16 h-16 mr-3 mb-4 rounded-full border-[1px] border-borderColor cursor-pointer flex items-center justify-center ${listCheckedSize.includes(item.size) ? 'bg-black text-white' : ''}`}>
                                                            {item.size}

                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className={`flex items-center flex-row flex-wrap my-2 float-left w-full`}>
                                            <label htmlFor={`custom-input-number`}
                                                   className={`mr-[25px]`}>Quantity</label>
                                            <div
                                                className="custom-number-input relative inline-flex overflow-hidden justify-center items-center w-[160px] rounded-xl border-[1px] border-borderColor">
                                                <button onClick={handleMinusCount} data-action="decrement"
                                                        className="flex justify-center border-r-[1px] items-center p-0 z-9 border-0 text-[12px] font-bold w-[30%] h-[32px] bg-whiteColor">
                                                    <span className="m-auto text-xl font-thin"><HiOutlineMinusSm
                                                        className={`w-7 h-7`}/></span>
                                                </button>
                                                <input
                                                    id={`custom-input-number`}
                                                    className="py-[10px] w-[50%] border-0 text-center text-blackColor flex-1 outline-0"
                                                    value={count}
                                                    onChange={handleOnChangeQuantity}
                                                    onKeyUp={handleOnKeyUp}
                                                    type="text"
                                                />
                                                <button onClick={handlePlusCount} data-action="increment"
                                                        className="flex justify-center border-l-[1px]  items-center p-0 z-9 border-0 text-[12px] font-bold w-[30%] h-[32px] rounded-none bg-whiteColor">
                                                    <span className="m-auto text-xl font-thin"><FiPlus
                                                        className={`w-7 h-7`}/></span>
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex-col mt-12 mb-4 float-left w-full flex justify-between sm:flex-row items-center`}>
                                            <div className={`md:mr-[12px] w-full `}>

                                                <div
                                                    onClick={() => handleAddProductToCart(product, count, product.outOfStock)}
                                                    className={`lg:text-3xl text-2xl w-full flex justify-center items-center leading-tight font-semibold border-2 border-lightGreenColor  mx-auto py-5 lg:px-10 px-8 rounded-2xl hover:text-white text-lightGreenColor duration-300 bg-white hover:bg-lightGreenColor cursor-pointer  md:mb-0 mb-6`}>
                                                    <BsFillCartFill
                                                        className={`md:w-7 md:h-7 h-6 w-6 mr-3 inline-block`}/>
                                                    Cart
                                                </div>
                                            </div>
                                            {
                                                isAuthenticated && <div className={`md:mr-[12px] w-full `}>
                                                    <div onClick={() => handleAddProductToWishList(product)}
                                                         className={`flex justify-center items-center lg:text-3xl text-2xl leading-tight font-semibold 2px] mx-auto py-5 lg:px-10 px-8 border-2 border-dangerColor-default_2 rounded-2xl hover:text-white text-dangerColor-default_2 bg-white hover:bg-dangerColor-hover_2 duration-300 cursor-pointer md:mb-0 mb-6`}>
                                                        <BsFillSuitHeartFill
                                                            className={`md:w-7 md:h-7 h-6 w-6 mr-3 inline-block`}/>
                                                        Wishlist
                                                    </div>
                                                </div>
                                            }

                                            <div className={`w-full `}>
                                                <div onClick={() => handleAddProductToCompare(product)}
                                                     className={`${isAdded ? 'bg-warningColor text-white hover:text-warningColor' : 'bg-white hover:text-white text-warningColor '} border-warningColor flex justify-center items-center lg:text-3xl text-2xl leading-tight font-semibold mx-auto py-5 lg:px-10 px-8 border-2 rounded-2xl hover:bg-warningColor duration-300 cursor-pointer md:mb-0 `}>
                                                    {
                                                        isAdded ? <>
                                                            <PiArrowsOutLineVerticalDuotone
                                                                className={`rotate-45 md:w-7 md:h-7 h-6 w-6 mr-3 inline-block`}/>
                                                            Remove</> : <>
                                                            <PiArrowsInLineVerticalDuotone
                                                                className={`rotate-45 md:w-7 md:h-7 h-6 w-6 mr-3 inline-block`}/>
                                                            Compare
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`my-4 float-left w-full`}>
                                            {
                                                policyList.length > 0 && policyList.map((item, index) => {
                                                    const Icon = item.icon
                                                    return (
                                                        <div key={index} onClick={() => handleOpenPolicy(item.id)}
                                                             className={`border-b-borderColor border-b-[1px] mt-8`}>
                                                            <div
                                                                className={`flex items-center justify-between cursor-pointer`}>
                                                                <div className={`flex items-center text-2xl`}>
                                                                    <Icon className={`w-9 h-9 mr-8`}/>
                                                                    {item.title}
                                                                </div>
                                                                <div
                                                                    className={`flex items-center transition-transform duration-300 ${openPolicy.includes(item.id) ? 'rotate-180' : ''}`}>
                                                                    {
                                                                        openPolicy.includes(item.id) ?
                                                                            <AiOutlineMinus className={`w-7 h-7`}/> :
                                                                            <AiOutlinePlus className={`w-7 h-7`}/>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`my-6 ml-4 space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${openPolicy.includes(item.id) ? 'max-h-96 visible' : 'max-h-0 invisible'}`}>
                                                                <div className={`text-[14px]`}>
                                                                    {
                                                                        parse(item.content)
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`description w-full py-[50px] mx-auto px-[15px] `}>
                        <div>
                            <ul className={`float-left w-full overline relative p-0 m-0 text-left`}>
                                <li className={`inline-block bg-lightGreenColor text-white font-semibold`}>
                                    <a className={`block p-[12px_30px] text-center`}>Description</a>
                                </li>
                                {/*<li className={`inline-block`}>*/}
                                {/*    <a className={`block p-[12px_30px] text-center`}>Reviews</a>*/}
                                {/*</li>*/}
                            </ul>
                            <div className={`float-left p-[30px] border-[1px] border-borderColor w-full mb-[40px]`}>
                                <div className={`tab-1`}>
                                    {
                                        product.content
                                    }
                                </div>
                                <div className={`tab-2`}></div>
                            </div>
                        </div>
                    </div>
                    <div className={`related`}></div>
                </div>
            </section>
        </>
    );
};
const listBreadcrumb = (name) => {
    return [
        {
            name: "",
            path: `${FINAL_URL_CUSTOMER}`
        },
        {
            name: "All Products",
            path: "/v1/products"
        },
        {
            name: name,
            path: ""
        }
    ]
}
const policyList = [
    {
        id: 1,
        icon: LiaShippingFastSolid,
        title: 'Shipping & Returns',
        content: `<p>Free Shipping And Returns Available On All Orders!<br>We Ship All US Domestic Orders Within <strong>5-10 Business Days!</strong></p>`,
    },
    {
        id: 2,
        icon: MdOutlineDiscount,
        title: 'Exclusive Offers',
        content: `<p>Now enjoy the benefits of exclusive offers. Subscribe soilplant.com to remain updated on latest offers</p>`
    },
    {
        id: 3,
        icon: AiOutlineHeart,
        title: 'Care Instructions',
        content: `<p>Choose an area in your house that receives proper sunlight.We should take care to water the plants regularly at proper intervals. </p>`
    }
]
const mainOptions = {
    type: 'fade',
    rewind: true,
    pagination: false,
    arrows: false,
    autoplay: true,
    interval: 5000,
};
const thumbsOptions = {
    type: 'loop',
    lazyLoad: 'nearby',
    rewind: true,
    pagination: false,
    cover: true,
    focus: 'center',
    omitEnd: true,
    perPage: 4,
    perMove: 1,
    gap: '0.5rem',
    isNavigation: true,
};
export default ProductDetail;