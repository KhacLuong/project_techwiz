import React from 'react';
import {FaPencilAlt, FaSort, FaTrashAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import ReactTyped from "react-typed";

const Table = ({
                   theadData,
                   tbodyData,
                   tbodyAction,
                   fetchDelete,
                   pageNumber,
                   perPage,
                   sortField,
                   sortDir,
                   fetchAll,
                   status,
                   setSortField,
                   setSortDir,
                   firstItemPerPage
               }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const handleDelete = async (id) => {
        MySwal.fire({
            title: 'Are you sure you want to delete this data?',
            text: "If confirmed, You will not be able to recover this data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#057a55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, continue!',
            cancelButtonText: 'Cancel',
            customClass: 'swal-wide',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await dispatch(fetchDelete({id})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        const keyword = ""
                        dispatch(fetchAll({pageNumber, perPage, sortField, sortDir, keyword}))
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                }
            }
        })
    }
    const handleFilter = (e, name) => {
        e.preventDefault()
        setSortField(name)
        setSortDir((sortDir) => sortDir === 'desc' ? 'asc' : 'desc')
    }
    const handleEdit = (id) => {
        navigate('edit', {
            state: {
                id: id
            }
        })
    }
    return (
        <div className={`flex flex-col my-6 mx-4 rounded-2xl shadow-lg shadow-gray-200`}>
            <div className={`overflow-x-auto rounded-2xl`}>
                <div className={`inline-block min-w-full align-middle`}>
                    <div className={`overflow-hidden shadow-lg`}>
                        <table className={`w-full text-left text-gray-500`}>
                            <thead
                                className={`text-gray-700 capitalize bg-gray-50`}>
                            <tr>
                                {
                                    theadData.map((item, index) => {
                                        if (typeof item === "object") {
                                            return (
                                                <th key={`th-${index}`} scope={`col`} className={`px-4 py-8`}
                                                    title={item.field}>
                                                    <div className={`flex items-center`}>
                                                        {item.name}
                                                        <div className={`flex items-center`}>
                                                            <button onClick={(e) => handleFilter(e, item.field)}>
                                                                <FaSort className={`w-5 h-5 ml-1`}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </th>
                                            )
                                        }
                                        return (
                                            <th key={`th-${index}`} scope={`col`} className={`px-4 py-8`}
                                                title={item}>
                                                <div className={`flex items-center`}>
                                                    {item}
                                                </div>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                status === "loading" ?
                                    <tr className={`w-full relative`}>
                                        <td colSpan={theadData.length}
                                            className={`text-center align-middle w-full py-8`}>
                                            <SyncLoader loading={true} color="#374151"
                                                        className={`absolute left-1/2 -translate-y-1/2`}/>
                                        </td>
                                    </tr> :
                                    tbodyData && tbodyData.length > 0 ?
                                        tbodyData.map((data, index) => {
                                            return (
                                                <tr key={`tr-${index}`}
                                                    className={`bg-white border-b hover:bg-gray-50 text-gray-600 font-normal`}>
                                                    <td className="px-4 py-8">{firstItemPerPage++}</td>
                                                    {
                                                        data && data.items ?
                                                            data.items.map((item, index) => {
                                                                if (typeof item === "string") {
                                                                    return (
                                                                        <td key={`td-${index}`}
                                                                            className={`px-4 py-8`}>{item}</td>
                                                                    )
                                                                } else if (typeof item === "number") {
                                                                    return (
                                                                        <td key={`td-${index}`}
                                                                            className={`px-4 py-8 text-successColor`}>{item} VNĐ</td>
                                                                    )
                                                                } else {
                                                                    if (item?.content) {
                                                                        return (<td key={`td-${index}`}
                                                                                    className={`px-4 py-8 w-80 text-justify`}>
                                                                                {item.content}
                                                                            </td>
                                                                        )
                                                                    } else if (item?.msg) {
                                                                        return <td key={`td-${index}`}
                                                                                   className={`px-4 py-8 ${item?.status ? 'text-successColor' : 'text-dangerColor-default_2'}`}>
                                                                            {item?.msg}
                                                                        </td>
                                                                    }
                                                                    return <td key={`td-${index}`}
                                                                               className={`px-4 py-8 w-24`}>
                                                                        <img src={item?.imagePath} alt={item?.imageName}
                                                                             className={`aspect-square object-cover`}/>
                                                                    </td>
                                                                }
                                                            })
                                                            :
                                                            <></>
                                                    }
                                                    <td className="px-4 py-8">
                                                        <div className={`flex items-center`}>
                                                            {
                                                                tbodyAction.map((action, index) => {
                                                                    return (
                                                                        <div key={`td-${index}`}>
                                                                            {
                                                                                action === 'edit' ?
                                                                                    <div
                                                                                        className={`inline-flex items-center justify-center text-center text-white duration-300 p-4 rounded-xl bg-primaryColor hover:bg-primaryColor_hover mr-3`}>
                                                                                        <button className={``}
                                                                                                onClick={() => handleEdit(data?.id)}>
                                                                                            <FaPencilAlt
                                                                                                className={`w-7 h-7`}/>
                                                                                        </button>
                                                                                    </div>
                                                                                    :

                                                                                    <div>
                                                                                        <button
                                                                                            className={`inline-flex items-center justify-center text-center text-white duration-300 p-4 rounded-xl hover:bg-dangerColor-default_3 bg-dangerColor-default_2`}
                                                                                            onClick={() => handleDelete(data?.id)}>
                                                                                            <FaTrashAlt
                                                                                                className={`w-7 h-7`}/>
                                                                                        </button>
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }) :
                                        <tr>
                                            <td colSpan={theadData.length}
                                                className={`text-center py-8 text-dangerColor-default_2 text-base font-semibold`}>
                                                Chưa có dữ liệu<ReactTyped
                                                loop
                                                typeSpeed={300}
                                                backSpeed={50}
                                                strings={["...!"]}
                                                smartBackspace
                                                shuffle={false}
                                                backDelay={1}
                                                fadeOut={false}
                                                fadeOutDelay={100}
                                                loopCount={0}
                                                showCursor
                                                cursorChar="|"
                                            />
                                            </td>
                                        </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;