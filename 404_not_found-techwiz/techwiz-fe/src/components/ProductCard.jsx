import React, {useContext, useEffect, useReducer, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LiaBinocularsSolid, LiaShoppingCartSolid} from "react-icons/lia";
import {TbHeart} from "react-icons/tb";
import parse from "html-react-parser";
import {handleFormatPriceToUSD, renderStar} from "../utils/helper.jsx";
import {PiArrowsInLineVerticalDuotone, PiArrowsOutLineVerticalDuotone} from "react-icons/pi";
import {Context} from "../context/ContextProvider.jsx";
import {BsFillCartFill} from "react-icons/bs";
import produce from "immer";
import moment from "moment";
import {toast} from "react-toastify";

const ProductCard = ({product, gridCols}) => {
    const navigate = useNavigate()
    const {compareProducts, dispatchCompare, handleAddProductToCart} = useContext(Context);
    const isAdded = compareProducts.products.some(item => item.id === product.id);
    const [productConvert, setProductConvert] = useState({})

    useEffect(() => {
        if (product) {
            const currentDate = moment();
            const nextState = produce({}, draft => {
                draft.productName = product.productName
                draft.priceDefault = Math.min(...product?.productInfos.map(item => item.price))
                draft.sale = false
                draft.priceAfterSale = 0
                draft.hot = product.hot
                draft.id = product.id
                draft.type = product.type
                draft.slug = product.slug
                draft.imagePath = product.imagePath
                draft.brand = product.brand
                draft.category = product.category
                draft.summary = product.summary
                draft.productInfos = product.productInfos
                draft.tags = product.tags
                draft.new = currentDate.diff(moment(product.createdAt), 'days') < 7
                draft.outOfStock = product.productInfos.every(item => item.quantity < 0)
                draft.star = 5
                draft.thumbnails = product.productThumbnails
                draft.imagePath = product.imagePath
                draft.productCode = product.productCode
                draft.content = product.content
                draft.sku = product.sku
            })
            setProductConvert(nextState)
        }
    }, [product])

    const handleGoDetailPage = (item) => {
        navigate(`/v1/products/${item.slug}`, {
            state: {
                id: item.id,
                productName: item.productName,
            }
        })
    }
    const handleAddProductToCompare = (productConvert) => {
        dispatchCompare({type: isAdded ? 'REMOVE' : 'ADD', payload: productConvert})
        toast.success("Product added to compare list")
    }
    return (
        <article
            className={`${gridCols === 1 ? 'flex items-center flex-row justify-start' : 'flex justify-between flex-col'} h-full product-card group/product m-0 bg-white border-[1px] border-borderColor overflow-hidden relative rounded-3xl p-3 transition-all duration-300 ease-in-out `}>
            <div
                className={`${gridCols === 1 ? 'w-[28%]' : 'w-full'} h-full  p-0 overflow-hidden text-center relative rounded-3xl float-left min-h-[1px]`}>
                <div onClick={() => handleGoDetailPage(productConvert)}
                     className={`w-full h-full block overflow-hidden relative text-[#333333] outline-0 cursor-pointer`}>
                    <img src={productConvert.imagePath} alt={productConvert.productName}
                         className={`group-hover/product:scale-105 scale-[1.01] duration-500 mx-auto max-w-full align-middle w-full h-full`}/>
                    <span
                        className={`group-hover/product:opacity-50 absolute top-0 left-0 right-0 bottom-0 opacity-0 duration-500 bg-[#484848] z-10`}></span>
                </div>
                <div
                    className={`absolute top-[10px] left-[15px] right-auto bottom-auto z-20`}>
                    {
                        !productConvert.outOfStock && productConvert.sale && (
                            <div
                                className={`w-16 h-16 p-2 flex items-center justify-center bg-dangerColor-default_2 text-lg rounded-full text-white mb-4`}>Sale</div>
                        )
                    }
                    {
                        !productConvert.outOfStock && productConvert.hot && (
                            <div
                                className={`w-16 h-16 flex items-center justify-center bg-warningColor text-lg rounded-full text-white mb-4`}>Hot</div>
                        )
                    }
                    {
                        !productConvert.outOfStock && productConvert.new && (
                            <div
                                className={`w-16 h-16 flex items-center justify-center bg-lightGreenColor text-lg rounded-full text-white`}>New</div>
                        )
                    }
                </div>
                <div className={`product-action`}>
                    <div className={`product-action-item`}>
                        <button onClick={() => handleAddProductToCart(productConvert)}>
                            <LiaShoppingCartSolid className={`w-8 h-8`}/>
                            <span>Add to Cart</span>
                        </button>
                        <button>
                            <TbHeart className={`w-8 h-8`}/>
                            <span>Add to Wishlist</span>
                        </button>
                        <button className={isAdded ? 'bg-lightGreenColor text-white' : ''} onClick={() => handleAddProductToCompare(productConvert)}>
                            {
                                !isAdded ? <>
                                        <PiArrowsInLineVerticalDuotone className={`w-8 h-8 rotate-45`}/>
                                        <span>Add to Compare</span>
                                    </> :
                                    <>
                                        <PiArrowsOutLineVerticalDuotone className={`w-8 h-8 rotate-45`}/>
                                        <span>Remove from Compare</span>
                                    </>
                            }

                        </button>
                        <button>
                            <LiaBinocularsSolid className={`w-8 h-8`}/>
                            <span>Quick view</span>
                        </button>
                    </div>
                </div>
            </div>
            <div onClick={() => handleGoDetailPage(productConvert)}
                 className={`px-[15px] text-center ${gridCols === 1 ? 'w-[62%] pl-[40px]' : 'w-full'} cursor-pointer`}>
                <div className={`float-left py-[10px] w-full ${gridCols === 1 ? 'text-left' : 'text-center'} `}>
                    <h4 className={`line-clamp-2 float-left w-full mb-8 text-2xl group-hover/product:text-lightGreenColor duration-300`}>
                        {productConvert.productName}
                    </h4>
                    <div
                        className={`flex items-center ${gridCols === 1 ? 'justify-start' : 'justify-center'} w-full mb-2.5 `}>
                        {
                            parse(renderStar(productConvert.star))
                        }
                    </div>
                    {
                        gridCols === 1 && <p className={`my-4`}>
                            {productConvert.summary}
                        </p>
                    }
                    <div className={`clear-both text-black font-bold`}>
                        {
                            productConvert.sale && (
                                <span
                                    className={`text-2xl mr-4 text-dangerColor-default_2`}>{handleFormatPriceToUSD(productConvert.priceAfterSale)}</span>
                            )
                        }
                        <span
                            className={`${productConvert.sale ? 'text-[#777777] line-through font-light italic' : 'text-2xl text-lightGreenColor'}`}>{handleFormatPriceToUSD(productConvert.priceDefault)}</span>
                    </div>
                    {
                        gridCols === 1 && <div className={`flex items-center `}>
                            <div onClick={() => handleGoDetailPage(productConvert)}
                                className={`uppercase text-2xl flex justify-center items-center leading-tight font-semibold border-2 border-lightGreenColor py-5 lg:px-4 px-8 rounded-2xl hover:text-white text-lightGreenColor duration-300 bg-white hover:bg-lightGreenColor cursor-pointer mt-6 w-auto`}>
                                <BsFillCartFill className={`md:w-7 md:h-7 h-6 w-6 mr-3 inline-block`}/>
                                Select option
                            </div>
                        </div>
                    }
                </div>
            </div>
        </article>
    );
};

export default ProductCard;