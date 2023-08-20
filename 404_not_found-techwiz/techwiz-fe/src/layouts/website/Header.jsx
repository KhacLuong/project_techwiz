import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../context/ContextProvider.jsx";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {fetchLogout} from "../../redux/slices/authSlice.jsx";
import {navbar} from "../../utils/setting-data.jsx";
import {HiOutlineMenuAlt1, HiOutlineSearch, HiOutlineTicket} from "react-icons/hi"
import {AiFillHeart} from "react-icons/ai";
import {HiShoppingBag} from "react-icons/hi2";
import {BiSolidUser} from "react-icons/bi";
import useScrollPosition from "../../hooks/useScrollPosition.jsx";
import {FaRegUserCircle} from "react-icons/fa";
import {MdLogin, MdLogout, MdOutlineRateReview} from "react-icons/md";
import {PiArrowsInLineVerticalDuotone} from "react-icons/pi";
import wishlist from "../../pages/website/Wishlist.jsx";

const Header = () => {
    const {
        isAuthenticated, setOpenSearch,
        setShowNavMobile, setOpenLoginModal,
        setOpenCartModal, cartProduct,
        dispatchCart, dispatchCompare
    } = useContext(Context);
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showNavUser, setShowNavUser] = useState(false)
    const scrollPosition = useScrollPosition();
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        let count = 0;
        cartProduct.cart.forEach(item => {
            count += item.qty
        })
        setCartCount(count)
    }, [cartProduct.cart, cartCount])

    const handleLogin = () => {
        setOpenLoginModal(true)
    }
    const handleGoToProfilePage = async (state) => {
        navigate(`/v1/user/${state.url}`,
            {
                state: {
                    name: state.name
                }
            })
    }
    const handleLogout = () => {
        MySwal.fire({
            title: 'Are you sure you want to continue logging out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#057a55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue!',
            cancelButtonText: 'Cancel',
            customClass: 'swal-wide',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await dispatch(fetchLogout()).unwrap()
                if (res && res.code === 200) {
                    navigate("")
                    toast.success(res.message)
                    dispatchCart({type: 'REMOVE_ALL_ITEMS'})
                    dispatchCompare({type: 'REMOVE_ALL_ITEMS'})
                }
            }
        })
    }

    const handleHideNavbar = () => {
        setShowNavUser(false);
    };
    const handleGoNavigate = (url) => {
        setShowNavUser(false)
        navigate(url)
    }
    const handleOpenSearch = () => {
        setOpenSearch(true)
        setShowNavUser(false)
    }
    return (
        <>
            {showNavUser && <div className="fixed inset-0 z-[99]" onClick={handleHideNavbar}/>}
            <header
                className={`block fixed top-0 left-0 w-full z-[99] right-0 bottom-auto duration-300 ease-linear ${scrollPosition > 1 ? 'bg-[#1b1b1b] backdrop-blur-[33px]' : 'bg-[#00000000]'}`}>
                <div
                    className={`lg:grid lg:px-[50px] items-center lg:grid-cols-[1fr_auto_1fr] grid-cols-[auto_1fr_1fr] px-[15px] flex justify-between`}>
                    <div onClick={() => setShowNavMobile(true)}
                         className={`lg:hidden justify-self-start 2xs:mr-[35px] mr-4 cursor-pointer`}>
                        <HiOutlineMenuAlt1 className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9 text-white`}/>
                    </div>
                    <h1 className={`lg:justify-self-start lg:w-full sm:w-auto m-0 leading-[0]`}>
                        <Link to={`/`}
                              className={`text-lightGreenColor lg:text-[4rem] 3xs:text-[3rem] xs:text-[2.5rem] items-center font-semibold lg:ml-0 inline-flex break-words lg:py-10 py-5`}>
                            <img src={`https://eprojectsem4.blob.core.windows.net/plant-nest/plant-nest.png`}
                                 alt={`icon`} className={`mr-2 lg:w-12 3xs:w-9 xs:w-7 h-auto`}/> PlantNest
                        </Link>
                    </h1>
                    <nav className={`lg:block lg:w-auto lg:float-left ml-0 xl:ml-[30px] hidden`}>
                        <ul className={`inline-flex flex-wrap list-none p-0 m-0`}>
                            {
                                navbar.map((item, index) => {
                                    return (
                                        <li key={index}
                                            className={`p-0 relative list-none float-left mx-5 leading-5 xl:mx-[13px] text-white`}>
                                            <Link to={item.url}
                                                  className={`flex items-center py-[35px] text-3xl font-normal`}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                    <div className={`float-right text-right inline-flex justify-end items-center text-white`}>
                        <div className={`lg:inline-block hidden align-top m-[12px_20px_0_0] relative cursor-pointer`}>
                            <div onClick={handleOpenSearch}>
                                <HiOutlineSearch className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9`}/>
                            </div>
                        </div>
                        <div className={`lg:inline-block hidden align-top m-[12px_20px_0_0] relative cursor-pointer`}>
                            <div onClick={() => setShowNavUser(!showNavUser)}
                                 className={`relative`}>
                                <BiSolidUser className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9`}/>
                                <div
                                    className={`${showNavUser ? 'max-h-96 visible' : 'max-h-0 invisible'} mt-1 rounded-xl border-[1px] absolute -right-1/2 left-auto top-full w-80 bg-white ml-4 space-y-2 transition-all duration-300 ease-in-out overflow-hidden`}>
                                    <ul className="text-2xl text-[#777777] w-full flex items-center flex-col z-[105]">
                                        {
                                            isAuthenticated &&
                                            <>
                                                <li className={`w-full`}>
                                                    <div onClick={() => handleGoToProfilePage({
                                                        url: 'my-profile',
                                                        name: 'My profile'
                                                    })}
                                                         className="cursor-pointer duration-300 flex items-center py-5 pl-16 hover:bg-gray-100  whitespace-nowrap font-normal">
                                                        <FaRegUserCircle className={`w-9 h-9 mr-4`}/>
                                                        My profile
                                                    </div>
                                                </li>
                                                <li className={`w-full`}>
                                                    <div onClick={() => handleGoToProfilePage({
                                                        url: 'my-bill',
                                                        name: 'Bill'
                                                    })}
                                                         className="cursor-pointer duration-300 flex items-center py-5 pl-16 hover:bg-gray-100  whitespace-nowrap font-normal">
                                                        <HiOutlineTicket className={`w-9 h-9 inline-block mr-4`}/>
                                                        Bill
                                                    </div>
                                                </li>
                                            </>
                                        }
                                        <li className={`w-full`}>
                                            <div onClick={() => handleGoToProfilePage({
                                                url: 'compare',
                                                name: 'Compare'
                                            })}
                                                 className="cursor-pointer duration-300 flex items-center py-5 pl-16 hover:bg-gray-100  whitespace-nowrap font-normal">
                                                <PiArrowsInLineVerticalDuotone
                                                    className={`w-9 h-9 rotate-45 inline-block mr-4`}/>
                                                Compare
                                            </div>
                                        </li>
                                        {
                                            isAuthenticated ? <li className={`w-full`}>
                                                <div onClick={() => handleLogout()}
                                                     className="cursor-pointer duration-300 flex items-center py-5 pl-16 hover:bg-gray-100  whitespace-nowrap font-normal">
                                                    <MdLogout className={`w-9 h-9 mr-4`}/> Log out
                                                </div>
                                            </li> : <li className={`w-full`}>
                                                <div onClick={() => setOpenLoginModal(true)}
                                                     className="cursor-pointer duration-300 flex items-center py-5 pl-16 hover:bg-gray-100  whitespace-nowrap font-normal">
                                                    <MdLogin className={`w-9 h-9 mr-4`}/> Sign in
                                                </div>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {
                            isAuthenticated && <div
                                className={`lg:inline-block hidden align-top m-[12px_20px_0_0] relative cursor-pointer`}>
                                <div onClick={() => handleGoNavigate("/v1/user/wishlist")}>
                                    <AiFillHeart className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9`}/>
                                </div>
                                {/*<span*/}
                                {/*    className={`absolute bg-dangerColor-default_2 -top-4 -right-4 inline-flex w-9 h-9 items-center justify-center rounded-full`}></span>*/}
                            </div>
                        }
                        <div
                            className={`inline-block align-top lg:m-[12px_0_0_0] xs:m-[0_0_0_0] relative cursor-pointer`}>
                            <div onClick={() => setOpenCartModal(true)}>
                                <HiShoppingBag className={`lg:w-12 lg:h-12 xs:w-9 xs:h-9`}/>
                            </div>
                            {
                                cartCount > 0 && <span
                                    className={`absolute bg-dangerColor-default_2 -top-4 -right-4 inline-flex w-9 h-9 items-center justify-center rounded-full`}>{cartCount}</span>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;