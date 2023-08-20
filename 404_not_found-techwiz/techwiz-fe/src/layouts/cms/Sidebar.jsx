import React from 'react';
import {dataSidebarAdmin} from "../../utils/setting-data.jsx";
import ElementSidebar from "../../components/ElementSidebar.jsx";
import {fetchLogout} from "../../redux/slices/authSlice.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";

const Sidebar = () => {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch();
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

                }
            }
        })
    }
    return (
        <div className={`flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50`}>
            <div className={`flex overflow-y-auto flex-col flex-1`}>
                <div className={`flex-1 px-8 bg-gray-50`} id={`sidebar-items`}>
                    <ul className={`pb-2 pt-1`}>
                        {
                            dataSidebarAdmin.map((item, index) => {
                                const Icon = item.icon
                                if (item.isSubcategory) {
                                    return (
                                        <li key={`sidebar-item-${index}`} className={`py-6`}>
                                            <ElementSidebar item={item} Icon={Icon} path={`/admin/v1/cms`}/>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={`sidebar-item-${index}`} className="w-full mt-4 mb-3">
                                            <h6 className="pl-4 font-bold leading-tight uppercase text-xl opacity-60">{item.name}</h6>
                                        </li>
                                    )
                                }
                            })
                        }
                        <li onClick={handleLogout} className={`ml-6 mt-12 bg-dangerColor-default_2 inline-block py-3 px-5 text-white rounded-lg cursor-pointer`}>Sign out</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;