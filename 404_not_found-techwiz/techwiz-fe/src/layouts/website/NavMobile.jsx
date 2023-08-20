import React, {useContext} from 'react';
import {BsXLg} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import {navbar} from "../../utils/setting-data.jsx";
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight} from "react-icons/md";
import {Context} from "../../context/ContextProvider.jsx";

const NavMobile = () => {
    const navigate = useNavigate()
    const {showNavMobile, setShowNavMobile} = useContext(Context);
    const handleGoAnotherPage = (url) => {
        setShowNavMobile(false)
        navigate(url)
    }
    return (
        <div
            className={`${showNavMobile ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} duration-300 fixed top-0 w-screen 3sm:max-w-xl h-full bg-white z-[101] `}>
            <div className={`relative w-full h-full`}>
                <div onClick={() => setShowNavMobile(false)} className={`absolute right-8 top-8 cursor-pointer`}>
                    <BsXLg className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9`}/>
                </div>
                <h1 className={`sm:invisible text-center`}>
                    <Link to={`/`}
                          className={`text-lightGreenColor lg:text-[4rem] 3xs:text-[3rem] mt-8 xs:text-[2.5rem] items-center font-semibold lg:ml-0 inline-flex break-words lg:py-10 py-5`}>
                        <img src={`https://eprojectsem4.blob.core.windows.net/plant-nest/plant-nest.png`}
                             alt={`icon`} className={`mr-2 lg:w-12 3xs:w-9 xs:w-7 h-auto`}/> PlantNest
                    </Link>
                </h1>
                <nav className={`lg:hidden`}>
                    <ul className={`inline-flex flex-col list-none p-0 m-0 w-full `}>
                        {
                            navbar.map((item, index) => {
                                return (
                                    <li key={index}
                                        className={`relative list-none mx-5 leading-5 border-b-[1px] border-b-borderColor`}>
                                        <div className={`px-10 flex justify-between items-center`}>
                                            <div onClick={() => handleGoAnotherPage(item.url)}
                                                 className={`flex items-center pb-[20px] first:pt-[25px]  font-medium`}>
                                                <span className={`text-2xl 3xs:text-3xl`}>{item?.name}</span>
                                            </div>
                                            {
                                                item?.children && item?.children.length > 0 && (
                                                    <div>
                                                        <MdOutlineKeyboardArrowRight
                                                            className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9`}/>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default NavMobile;