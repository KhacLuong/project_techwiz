import React, {useContext, useEffect, useRef, useState} from 'react';
import {HiOutlineSearch, HiOutlineEye} from "react-icons/hi";
import {IoNotificationsSharp} from "react-icons/io5";
import {HiOutlineBars3CenterLeft} from "react-icons/hi2";
import {MdOutlineClose} from "react-icons/md";
import {RiSettings3Fill} from "react-icons/ri";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchLogout} from "../../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";
import {Context} from "../../context/ContextProvider.jsx";

const Navbar = () => {
    const {account} = useContext(Context);
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const menuRef = useRef();
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        const handler = (event) => {
            if (openMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false)
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        }
    }, [openMenu])
    const handleLogout = (e) => {
        e.preventDefault()
        MySwal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#057a55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tiếp tục!',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await dispatch(fetchLogout()).unwrap()
                navigate("/admin/v1/cms/sign-in")
                toast.success(res.message)
            }
        })
    }
    const handleOpenSidebar = () => {

    }
    return (
        <div className={`py-14 px-5 lg:px-7 lg:pl-5 shadow z-10`}>
            <div className={`flex justify-between items-center`}>
                <div className="flex justify-start items-center">
                    <button onClick={handleOpenSidebar} id={`toggleSidebarMobile`} aria-expanded={true}
                            aria-controls={`sidebar`}
                            className={`p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100`}>
                        <HiOutlineBars3CenterLeft className={`w-6 h-6 text-black`}/>
                        <MdOutlineClose className="w-6 h-6 hidden text-black"/>
                    </button>
                    <Link to={""} className={`text-md lg:ml-4 font-semibold flex items-center lg:mr-1.5`}>
                        <span
                            className={`hidden md:inline-block self-center text-6xl font-bold whitespace-nowrap`}>BizTrip</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;