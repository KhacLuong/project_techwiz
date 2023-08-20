import React, {useContext, useEffect} from 'react';
import BannerComponent from "../../../components/BannerComponent.jsx";
import {FaRegUserCircle} from "react-icons/fa";
import {HiOutlineTicket} from "react-icons/hi";
import {MdOutlineRateReview} from "react-icons/md";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Context} from "../../../context/ContextProvider.jsx";
import {FINAL_URL_CUSTOMER} from "../../../utils/setting-data.jsx";
import MyInfo from "./MyInfo.jsx";
import MyBill from "./MyBill.jsx";
import Compare from "./Compare.jsx";
import MyPassword from "./MyPassword.jsx";
import {RiLockPasswordLine} from "react-icons/ri";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const name = location?.state?.name
    const {slug} = useParams()
    const {userId, isAuthenticated} = useContext(Context);
    useEffect(() => {
        if (slug !== 'compare' && !isAuthenticated) {
            navigate("/")
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    }, [])
    const handleGoToProfilePage = (state) => {
        navigate(`/v1/user/${state.url}`,
            {
                state: {
                    name: state.name
                }
            })
    }
    const listBreadcrumb = (name) => {
        return [
            {
                name: "",
                path: `${FINAL_URL_CUSTOMER}`
            },
            {
                name: name,
                path: "/"
            },
        ]
    }
    return (
        <>
            <BannerComponent listBreadcrumb={listBreadcrumb(name)}/>
            <section className={`w-full my-[60px] p-0`}>
                <div className={`max-w-[1280px] md:px-[15px] mx-auto my-0`}>
                    <div className={`flex w-full mt-[1.5rem]`}>
                        <div className={`py-4 w-[20%] float-left`}>
                            <aside
                                className=" z-40 transition-transform -translate-x-full sm:translate-x-0">
                                <div className="overflow-y-auto bg-gray-100">
                                    <ul className="space-y-2 font-normal">
                                        {
                                            isAuthenticated && (
                                                <>
                                                    <li className={`w-full p-4 hover:bg-gray-200 duration-300 cursor-pointer`}
                                                        onClick={() => handleGoToProfilePage({
                                                            url: 'my-profile',
                                                            name: 'My profile'
                                                        })}>
                                                        <div
                                                            className={`${slug === 'my-profile' ? 'text-lightGreenColor' : 'text-gray-900'} inline-flex items-center p-2 rounded-lg group`}>
                                                            <FaRegUserCircle className={`w-9 h-9 mr-5 text-gray-700`}/> My
                                                            profile
                                                        </div>
                                                    </li>
                                                    <li className={`w-full p-4 hover:bg-gray-200 duration-300 cursor-pointer`}
                                                        onClick={() => handleGoToProfilePage({
                                                            url: 'my-password',
                                                            name: 'my-password'
                                                        })}>
                                                        <div
                                                            className={`${slug === 'my-password' ? 'text-lightGreenColor' : 'text-gray-900'} inline-flex items-center p-2 rounded-lg group`}>
                                                            <RiLockPasswordLine className={`w-9 h-9 mr-5 text-gray-700`}/>
                                                            Password
                                                        </div>
                                                    </li>
                                                    <li className={`w-full p-4 hover:bg-gray-200 duration-300 cursor-pointer`}
                                                        onClick={() => handleGoToProfilePage({url: 'my-bill', name: 'Bill'})}>
                                                        <div
                                                            className={`${slug === 'my-bill' ? 'text-lightGreenColor' : 'text-gray-900'} inline-flex items-center p-2 rounded-lg group`}>
                                                            <HiOutlineTicket className={`w-9 h-9 mr-5 text-gray-700`}/> Bill
                                                        </div>
                                                    </li>
                                                </>
                                                )
                                        }
                                        <li className={`w-full p-4 hover:bg-gray-200 duration-300 cursor-pointer`}
                                            onClick={() => handleGoToProfilePage({url: 'compare', name: 'Compare'})}>
                                            <div
                                                className={`${slug === 'compare' ? 'text-lightGreenColor' : 'text-gray-900'} inline-flex items-center p-2 rounded-lg group`}>
                                                <HiOutlineTicket className={`w-9 h-9 mr-5 text-gray-700`}/> Compare
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </aside>
                        </div>
                        <div className={`flex-1 ml-[32px] py-4 w-[80%]`}>
                            {
                                slug === 'my-profile' ?
                                    <MyInfo userId={userId} dispatch={dispatch}/> :
                                    slug === 'my-bill' ?
                                        <MyBill dispatch={dispatch} userId={userId}/> :
                                        slug === 'compare' ?
                                            <Compare/> : <MyPassword userId={userId} dispatch={dispatch}/>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;