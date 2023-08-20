import React, {useContext} from 'react';
import {Context} from "../../context/ContextProvider.jsx";
import {HiOutlineSearch} from "react-icons/hi";
import {BsXLg} from "react-icons/bs";

const Search = () => {
    const {openSearch, setOpenSearch} = useContext(Context);

    return (
        <div style={{
            animationName: 'fadeIn',
            animationDuration: '400ms',
            animationTimingFunction: 'ease-in'
        }} className={`${openSearch ? 'block' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 z-[100] bg-[#0000005d]`}>
            <div className={`w-full h-full relative bg-white px-[25px] 2xs:px-[45px] pt-[30px]`}>
                <div className={`relative w-full flex items-center justify-end pb-[80px]`}>
                    <div onClick={() => setOpenSearch(false)} className={`bg-black text-white p-2 rounded-md cursor-pointer`}>
                        <BsXLg className={`2xs:w-9 2xs:h-9 h-7 w-7`}/>
                    </div>
                </div>
                <div className={`relative w-full flex items-center`}>
                    <input type={`text`} placeholder={`Search...`} className={`h-[50px] w-full outline-0 text-2xl 2xs:text-3xl border-b-[1px] border-b-black relative`}/>
                    <span className={`absolute right-0`}><HiOutlineSearch className={`2xs:w-9 2xs:h-9 h-7 w-7`}/></span>
                </div>
            </div>
        </div>
    );
};

export default Search;