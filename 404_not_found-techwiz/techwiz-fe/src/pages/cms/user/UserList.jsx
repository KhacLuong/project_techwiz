import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Table from "../../../components/Table.jsx";
import Paginate from "../../../components/Paginate.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUser, fetchRemoveUser, selectUser} from "../../../redux/slices/userSlice.jsx";
import {produce} from "immer";
import moment from "moment";
import {BiPlus} from "react-icons/bi";

const UserList = () => {
    useDocumentTitle("Manage user", true)

    const theadData = [
        '#',
        {field: 'fullName', name: 'Full name'},
        {field: 'email', name: 'Email'},
        {field: 'phoneNumber', name: 'Phone number'},
        {field: 'birthday', name: 'Birthday'},
        {field: 'gender', name: 'Gender'},
        {field: 'type', name: 'Role'},
        {field: 'createdAt', name: 'Created at'},
        {field: 'updatedAt', name: 'Updated at'},
        'Action'
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(selectUser)
    const status = useSelector((state) => state.user.status)
    const totalItems = useSelector((state) => state.user.totalItems)
    const totalPages = useSelector((state) => state.user.totalPages)
    const [tbodyData, setTbodyData] = useState([])
    const [sortField, setSortField] = useState("createdAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        dispatch(fetchAllUser({pageNumber, perPage, sortField, sortDir, keyword}))
    }, [navigate, dispatch, pageNumber, perPage, sortField, sortDir])
    useEffect(() => {
        if (users && users.length >= 0) {
            const nextState = produce([], draft => {
                users.map(item => {
                    console.log(item)
                    draft.push({
                        id: item?.id,
                        items: [
                            item?.fullName,
                            item?.email,
                            item?.phoneNumber,
                            moment(item?.dateOfBirth).format("DD/MM/YYYY"),
                            item?.gender,
                            item?.role,
                            item?.createdAt ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss") : "",
                            item?.updatedAt ? moment(item?.updatedAt).format("DD/MM/YYYY HH:mm:ss") : ""
                        ]
                    })
                })
            })
            setTbodyData(nextState)
        }
    }, [users])

    return (
        <>
            <div className={`py-8 rounded-2xl flex items-center justify-end shadow-lg shadow-gray-200`}>
                <Link to={"/admin/v1/cms/users/list/create"} className={`inline-flex items-center rounded-lg mr-24 cursor-pointer hover:bg-lime-600 bg-lightGreenColor duration-300 text-white px-6 py-4`}>
                        <BiPlus className={`mr-2 -ml-1 w-7 h-7`}/>
                    Add more
                </Link>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="500">
                <Table theadData={theadData}
                       tbodyData={tbodyData}
                       tbodyAction={['edit', 'delete']}
                       fetchDelete={fetchRemoveUser}
                       pageNumber={pageNumber}
                       perPage={perPage}
                       sortField={sortField}
                       sortDir={sortDir}
                       fetchAll={fetchAllUser}
                       status={status}
                       setSortField={setSortField}
                       setSortDir={setSortDir}
                       firstItemPerPage={firstItemPerPage}/>
                {
                    totalItems > 0 && totalPages > 0 ?
                        <Paginate pageNumber={pageNumber}
                                  setPageNumber={setPageNumber}
                                  sortField={sortField}
                                  sortDir={sortDir}
                                  fetchData={fetchAllUser}
                                  totalPages={totalPages}
                                  perPage={perPage}
                                  totalItems={totalItems}
                                  firstItemPerPage={firstItemPerPage}
                                  setFirstItemPerPage={setFirstItemPerPage}
                                  lastItemPerPage={lastItemPerPage}
                                  setLastItemPerPage={setLastItemPerPage}/> :
                        <></>
                }
            </div>
        </>
    );
};

export default UserList;