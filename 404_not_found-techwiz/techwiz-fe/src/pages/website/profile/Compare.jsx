import React, {useContext, useEffect, useReducer} from 'react';
import {Context} from "../../../context/ContextProvider.jsx";
import {BsXLg} from "react-icons/bs";
import {handleFormatPriceToUSD, renderStar} from "../../../utils/helper.jsx";
import {useNavigate} from "react-router-dom";
import {PiCheckFatFill} from "react-icons/pi";
import parse from "html-react-parser";

const Compare = () => {
    const {compareProducts, dispatchCompare, userId, isAuthenticated} = useContext(Context);
    const navigate = useNavigate()

    const handleRemovePromCompare = (product) => {
        dispatchCompare({type: 'REMOVE', payload: product})
    }
    const handleGoDetailPage = (item) => {
        navigate(`/v1/products/${item.slug}`, {
            state: {
                id: item.id,
                productName: item.productName,
            }
        })
    }
    return (
        <div className={`block`}>
            <div className={`m-0 flex flex-wrap p-0`}>
                {
                    compareProducts.products.length > 0 && compareProducts.products.map((item, index) => {

                        console.log(item)
                        return (
                            <ul key={index} className={`w-1/3 p-0 m-0 border-[1px] border-borderColor me-[-1px] relative`}>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <div className={`block overflow-hidden`}>
                                        <a onClick={() => handleGoDetailPage(item)} className={`text-current block`}>
                                            <div className={`bg-transparent`}>
                                                <img src={item.imagePath} alt={item.productName} className={`max-w-full h-[420px]`}/>
                                            </div>
                                        </a>
                                        <div className={`absolute right-[15px] top-[15px] w-auto m-0`}>
                                            <button onClick={() => handleRemovePromCompare((item))}
                                                    className={`bg-lightGreenColor p-[10px] mt-0 border-0 cursor-pointer flex items-center justify-center`}>
                                                <BsXLg className={`w-7 h-7 text-white`}/>
                                            </button>
                                        </div>
                                        <div className={`float-left w-full py-[15px] px-[5px]`}>
                                            <span className={`w-auto text-left line-clamp-1 font-normal`}>
                                                <a onClick={() => handleGoDetailPage(item)}>{item.productName}</a>
                                            </span>
                                            <div className={`mt-4 float-left w-full text-lightGreenColor font-medium`}>
                                                <span
                                                    className={`${item.sale ? 'text-[#777777] line-through font-light italic' : 'text-3xl text-lightGreenColor '}  mr-4`}>
                                                    {handleFormatPriceToUSD(item.priceDefault)}
                                                </span>
                                                {
                                                    item.sale && (
                                                        <span
                                                            className={`text-3xl text-dangerColor-default_2`}>{handleFormatPriceToUSD(item.priceAfterSale)}</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Review (1)
                                    </span>
                                    <span className={`text-right w-1/2 flex items-center justify-end`}>
                                         {
                                             parse(renderStar(item?.star))
                                         }
                                    </span>
                                </li>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Category
                                    </span>
                                    <span className={`text-right w-1/2`}>
                                        {
                                            item?.category?.categoryName
                                        }
                                    </span>
                                </li>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Brand
                                    </span>
                                    <span className={`text-right w-1/2`}>
                                        {
                                            item?.brand?.brandName
                                        }
                                    </span>
                                </li>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Type
                                    </span>
                                    <span className={`text-right w-1/2`}>
                                        {
                                            item?.type?.typeName
                                        }
                                    </span>
                                </li>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Sku
                                    </span>
                                    <span className={`text-right w-1/2`}>
                                        {
                                            item?.sku
                                        }
                                    </span>
                                </li>
                                <li className={`flex border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Availability
                                    </span>
                                    <span className={`text-right w-1/2`}>
                                        {
                                            item?.outOfStock ? 'Out of Stock' : 'In Stock'
                                        }
                                    </span>
                                </li>
                                <li className={`flex flex-col border-b-[1px] border-b-borderColor p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Color
                                    </span>
                                    <span className={`text-right flex flex-row mt-4`}>
                                         {
                                             item?.productInfos?.length > 0 && item?.productInfos?.map((item, index) => (
                                                 <div key={index}
                                                      className={`group/color relative w-12 h-12 mr-3 mb-4 ${item.color === 'BLUE' ? 'bg-blue-600' : item.color === 'BROWN' ? 'bg-amber-600' : item.color === 'WHITE' ? 'bg-white' : item.color === 'YELLOW' ? 'bg-yellow-400' : item.color === 'RED' ? 'bg-red-500' : item.color === 'PINK' ? 'bg-pink-400' : item.color === 'GREEN' ? 'bg-green-600' : 'bg-gray-500'} rounded-full border-[1px] border-borderColor cursor-pointer flex items-center justify-center`}>
                                                     <span
                                                         className={`group-hover/color:visible group-hover/color:opacity-100 group-hover/color:top-1/2 duration-500 transition-all absolute opacity-0 invisible top-0 z-30 right-1/2 translate-x-1/2 translate-y-[-60px] p-[4px_12px] bg-darkColor text-white rounded-lg before:content-[''] before:absolute before:-bottom-[4px] before:right-1/2 before:translate-x-1/2 before:z-10 before:rotate-45 before:w-4 before:h-4 before:bg-darkColor`}>{item.color}
                                                        </span>
                                                 </div>
                                             ))
                                         }
                                    </span>
                                </li>
                                <li className={`flex flex-col border-none p-[10px] relative`}>
                                    <span className={`text-left text-black font-medium mb-0 w-1/2`}>
                                        Size
                                    </span>
                                    <span className={`text-right flex flex-row mt-4`}>
                                        {
                                            item?.productInfos?.length > 0 && item?.productInfos?.map((item, index) => (
                                                <div key={index}
                                                     className={`group/color relative w-12 h-12 mr-3 mb-4 rounded-full border-[1px] border-borderColor cursor-pointer flex items-center justify-center`}>
                                                    {item.size}

                                                </div>
                                            ))
                                        }
                                    </span>
                                </li>
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    );
};
export default Compare;