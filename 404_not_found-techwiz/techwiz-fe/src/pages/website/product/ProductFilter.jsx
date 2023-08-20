import React, {useEffect, useState} from 'react';
import CategoryFilter from "../../../components/CategoryFilter.jsx";
import Slider from "@mui/material/Slider"
import {handleFormatPriceToUSD} from "../../../utils/helper.jsx";
import {AiOutlineMinus} from "react-icons/ai";
import BrandFilter from "../../../components/BrandFilter.jsx";
import TypeFilter from "../../../components/TypeFilter.jsx";
import ColorFilter from "../../../components/ColorFilter.jsx";
import SizeFilter from "../../../components/SizeFilter.jsx";

const ProductFilter = ({categories, brands, types, setColors, setCategoryIds, setBranchIds, setTypeIds, setSizes, price, setPrice, handleFilterByPrice, setCategories}) => {
    const minDistance = 0

    const handleUpdatePrice = (e, data, activeThumb) => {
        if (!Array.isArray(data)) {
            return;
        }
        if (activeThumb === 0) {
            setPrice([Math.min(data[0], data[1] - minDistance), data[1]]);
        } else {
            setPrice([price[0], Math.max(data[1], price[0] + minDistance)]);
        }
    }

    return (
        <div className={`col-span-1 mt-10`}>
            <div className={`w-full mb-[30px] p-0 border-[1px] border-borderColor rounded-xl`}>
                <div className={`mb-[10px] py-[10px] px-[18px] border-b-[1px] border-b-borderColor flex items-center justify-between`}>
                    <h3 className={`text-3xl font-medium`}>
                        #Categories
                    </h3>
                    {/*<button onClick={handleResetFilterCategory} className={`bg-dangerColor-default_2 text-white px-3 py-1 rounded-xl`}>Reset</button>*/}
                </div>
                <div className={`w-full px-[18px] pb-[10px] relative m-0`}>
                    <CategoryFilter categories={categories}
                                    setCategories={setCategories}
                                    setCategoryIds={setCategoryIds}/>
                </div>
            </div>
            <div className={`w-full mb-[30px] p-0 border-[1px] border-borderColor rounded-xl`}>
                <div className={`mb-[10px] py-[10px] px-[18px] border-b-[1px] border-b-borderColor flex items-center justify-between`}>
                    <h3 className={`text-3xl font-medium`}>
                        #Filter By
                    </h3>
                    {/*<button onClick={handleResetFilterCategory} className={`bg-dangerColor-default_2 text-white px-3 py-1 rounded-xl`}>Reset</button>*/}
                </div>
                <div className={`w-full px-[18px] pb-[10px] relative m-0`}>
                    <div className={`mb-[25px]`}>
                        <span className={`font-medium text-2xl mb-[8px]`}>Price</span>
                        <div className={`w-auto relative`}>
                            <div className={`px-4`}>
                                <Slider
                                    value={price}
                                    onChange={(e, data, activeThumb) => handleUpdatePrice(e, data, activeThumb)}
                                    getAriaLabel={() => 'Minimum distance'}
                                    disableSwap
                                    min={0}
                                    max={2000}
                                    className={`text-lightGreenColor`}
                                    valueLabelDisplay="off"
                                    sx={{
                                        color: '#82bb01', '& .MuiSlider-rail': {
                                            background: '#82bb01', height: '2px'
                                        }, '& .MuiSlider-track': {
                                            borderRadius: '16px', background: '#82bb01', height: '2px'
                                        }, '& .MuiSlider-thumb': {
                                            background: '#fff', width: '15px', height: '15px', border: '2px solid #82bb01'
                                        },
                                    }}
                                />
                            </div>
                            <div className={`mb-[10px] px-2 text-[#4d4d4d] text-2xl leading-normal font-medium flex items-center justify-between`}>
                                <div>
                                    <div className={`flex items-center text-[#141414] text-2xl font-normal`}>
                                        <span className={`mx-1`}>{handleFormatPriceToUSD(price[0])}</span>
                                        <AiOutlineMinus className={`mt-1`}/>
                                        <span
                                            className={`mx-1`}>{handleFormatPriceToUSD(price[1])}</span>
                                    </div>
                                </div>
                                <button className={`hover:bg-lime-600 duration-300 bg-lightGreenColor text-white px-5 py-2 rounded-lg`}
                                        onClick={handleFilterByPrice}>
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`mb-[25px]`}>
                        <span className={`font-medium text-2xl mb-[8px]`}>
                            Product type
                        </span>
                        <div className={`w-auto relative`}>
                            <TypeFilter types={types} setTypeIds={setTypeIds}/>
                        </div>
                    </div>
                    <div className={`mb-[25px]`}>
                        <span className={`font-medium text-2xl mb-[8px]`}>
                            Brands
                        </span>
                        <div className={`w-auto relative`}>
                            <BrandFilter brands={brands} setBranchIds={setBranchIds}/>
                        </div>
                    </div>
                    <div className={`mb-[25px]`}>
                        <span className={`font-medium text-2xl mb-[8px]`}>
                            Color
                        </span>
                        <div className={`w-auto relative`}>
                            <ColorFilter setColors={setColors}/>
                        </div>
                    </div>
                    <div className={`mb-[25px]`}>
                        <span className={`font-medium text-2xl mb-[8px]`}>
                            Size
                        </span>
                        <div className={`w-auto relative`}>
                            <SizeFilter setSizes={setSizes} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-full mb-[30px] p-0 border-[1px] border-borderColor rounded-xl`}>
                <div className={`mb-[10px] py-[10px] px-[18px] border-b-[1px] border-b-borderColor flex items-center justify-between`}>
                    <h3 className={`text-3xl font-medium`}>
                        #Tag
                    </h3>
                    {/*<button onClick={handleResetFilterCategory} className={`bg-dangerColor-default_2 text-white px-3 py-1 rounded-xl`}>Reset</button>*/}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;