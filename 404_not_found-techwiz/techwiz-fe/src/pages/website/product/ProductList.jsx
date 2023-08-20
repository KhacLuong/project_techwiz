import React, {useContext, useEffect, useReducer, useState} from 'react';
import {useDispatch} from "react-redux";
import {HiOutlineBars2, HiOutlineBars3} from "react-icons/hi2";
import ProductCard from "../../../components/ProductCard.jsx";
import {HiOutlineSearch} from "react-icons/hi";
import _debounce from 'lodash.debounce';

const ProductList = ({products, setFirstItemPerPage, perPage, setPerPage, setLastItemPerPag, setPageNumber, setKeyword, setSortDir, setSortField, setHot}) => {
    const dispatch = useDispatch()
    const [gridCols, setGridCols] = useState(3);
    const handleChangeGridCol = (newCols) => {
        setGridCols(newCols);
    }

    const debouncedSetKeyword = _debounce((value) => {
        setKeyword(value);
    }, 700);

    const handleInputChange = (event) => {
        const value = event.target.value;
        debouncedSetKeyword(value);
    };
    const handleSort = (e) => {
        const {value} = e.target
        if (value && value !== 'hot') {
            const [field, order] = value.split("-")
            if (order) {
                setSortDir(order)
                setSortField(field)
            } else {
                setSortField(field)
            }
        } else {
            setSortField("createdAt")
            setSortDir("desc")
            setHot(true)
        }
    }

    const optionSort = [
        {id: 0, value: 'hot', text: 'Featured'},
        {id: 2, value: 'productName-asc', text: 'Alphabetically, A-Z'},
        {id: 2, value: 'productName-desc', text: 'Alphabetically, Z-A'},
        {id: 3, value: 'priceFrom-asc', text: 'Price, low to high'},
        {id: 4, value: 'priceFrom-desc', text: 'Price, high to low'},
        {id: 5, value: 'createdAt-asc', text: 'Date, old to new'},
        {id: 6, value: 'createdAt-desc', text: 'Date, new to old'},
    ]
    return (
        <div className={`col-span-3 mt-10`}>
            <div className={`w-full mb-[60px]`}>
                <div className={`sort p-0 w-full inline-flex items-center justify-between`}>
                    <div className={`w-auto relative`}>
                        <input onChange={handleInputChange} type={`text`} placeholder={'Search product...'} className={`outline-none border-b-[1px] text-black border-b-borderColor pr-12`}/>
                        <span className={`absolute top-1/2 -translate-y-1/2 right-0`}>
                             <HiOutlineSearch className={`w-7 h-7 text-[#777777]`}/>
                        </span>
                    </div>
                    <div className={`inline-flex items-centers w-auto`}>
                        <label htmlFor="sort"
                               className="text-[#777777] text-2xl whitespace-nowrap flex items-center mr-2 font-medium">
                            Sort by:
                        </label>
                        <select id="sort"
                                name={`sort`}
                                onChange={handleSort}
                                className="bg-gray-50 border-[1px] border-borderColor text-gray-600 text-2xl rounded-xl focus:ring-blue-500 outline-0 focus:border-blue-500 w-full p-2.5 font-medium">
                            {
                                optionSort.map((item, index) => (
                                    <option className={`py-2`} key={index} value={item.value}>{item.text}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={`w-auto flex items-center`}>
                        <div className={`inline-flex items-center w-auto flex-row mr-8`}>
                            <label htmlFor="perPage"
                                   className="text-[#777777] text-2xl whitespace-nowrap flex items-center mr-2 font-medium">
                                Showing:
                            </label>
                            <select id={`perPage`}
                                    value={perPage}
                                    onChange={(e) => setPerPage(+e.target.value)}
                                    className="bg-gray-50 border-[1px] border-borderColor text-gray-600 text-2xl rounded-xl focus:ring-blue-500 outline-0 focus:border-blue-500 w-full p-2.5 font-medium mr-2">
                                {
                                    optionItemPerPage.map((item, index) => (
                                        <option key={index} value={item.value}>{item.text}</option>
                                    ))
                                }
                            </select>
                            <span className={`text-[#777777] text-2xl whitespace-nowrap flex items-center ml-2 font-medium`}>per page</span>
                        </div>
                        <div className={`w-auto grid grid-cols-3 gap-4`}>
                            <button onClick={() => handleChangeGridCol(3)} className={`col-span-1 p-3 ${gridCols === 3 ? 'bg-lightGreenColor text-white' : 'bg-[#f2f2f2] text-black'} hover:bg-lightGreenColor hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center`}>
                                <HiOutlineBars3 className={`rotate-90 w-7 h-7`}/>
                            </button>
                            <button onClick={() => handleChangeGridCol(2)} className={`col-span-1 ${gridCols === 2 ? 'bg-lightGreenColor text-white' : 'bg-[#f2f2f2] text-black'} hover:bg-lightGreenColor hover:text-white transition-all duration-300 p-3 rounded-xl `}>
                                <HiOutlineBars2 className={`rotate-90 w-7 h-7`}/>
                            </button>
                            <button onClick={() => handleChangeGridCol(1)} className={`col-span-1 ${gridCols === 1 ? 'bg-lightGreenColor text-white' : 'bg-[#f2f2f2] text-black'} hover:bg-lightGreenColor hover:text-white transition-all duration-300 p-3 rounded-xl`}>
                                <HiOutlineBars3 className={`w-7 h-7`}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`products w-full mt-10`}>
                    <div className={`p-0`}>
                        <ul
                            className={`flex flex-wrap duration-300 transition-all -mx-[15px]`}>
                            {
                                products.length > 0 && products.map((item, index) => (
                                    <li key={index} className={`${gridCols === 3 ? 'w-1/3' : gridCols === 2 ? 'w-1/2' : 'w-full'} px-[15px] pb-[30px] duration-300 transition-all`}>
                                        <ProductCard gridCols={gridCols} product={item}/>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
const optionItemPerPage = [
    {value: 9, text: '9'},
    {value: 12, text: '12'},
    {value: 15, text: '15'},
    {value: 18, text: '18'},
    {value: 21, text: '21'},
]

export default ProductList;