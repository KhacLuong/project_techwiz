import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetAllCategories, fetchRemoveCategory, selectCategory} from "../../../redux/slices/categorySlice.jsx";
import {produce} from "immer";
import moment from "moment";
import Table from "../../../components/Table.jsx";
import {BiPlus} from "react-icons/bi";
import Paginate from "../../../components/Paginate.jsx";

const CategoryList = () => {
    useDocumentTitle("Manage category", true)

    const theadData = [
        '#',
        {field: 'categoryName', name: 'Category name'},
        {field: 'categoryCode', name: 'Category code'},
        {field: 'createdAt', name: 'Created at'},
        {field: 'updatedAt', name: 'Updated at'},
        'Action'
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categories = useSelector(selectCategory)
    const status = useSelector((state) => state.category.status)
    const totalItems = useSelector((state) => state.category.totalItems)
    const totalPages = useSelector((state) => state.category.totalPages)
    const [tbodyData, setTbodyData] = useState([])
    const [sortField, setSortField] = useState("createdAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)

    useEffect(() => {
        dispatch(fetchGetAllCategories({pageNumber, perPage, sortField, sortDir}))
    }, [navigate, dispatch, pageNumber, perPage, sortField, sortDir])

    useEffect(() => {
        if (categories && categories.length >= 0) {
            const nextState = produce([], draft => {
                categories.map(item => {
                    draft.push({
                        id: item?.id,
                        items: [
                            item?.categoryName,
                            item?.categoryCode,
                            item?.createdAt ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss") : "",
                            item?.updatedAt ? moment(item?.updatedAt).format("DD/MM/YYYY HH:mm:ss") : ""
                        ]
                    })
                })
            })
            setTbodyData(nextState)
        }
    }, [categories])
    return (
        <>
            <div className={`py-8 rounded-2xl flex items-center justify-end shadow-lg shadow-gray-200`}>
                <Link to={"/admin/v1/cms/categories/list/create"} className={`inline-flex items-center rounded-lg mr-24 cursor-pointer hover:bg-lime-600 bg-lightGreenColor duration-300 text-white px-6 py-4`}>
                    <BiPlus className={`mr-2 -ml-1 w-7 h-7`}/>
                    Add more
                </Link>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="500">
                <Table theadData={theadData}
                       tbodyData={tbodyData}
                       tbodyAction={['edit', 'delete']}
                       fetchDelete={fetchRemoveCategory}
                       pageNumber={pageNumber}
                       perPage={perPage}
                       sortField={sortField}
                       sortDir={sortDir}
                       fetchAll={fetchGetAllCategories}
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
                                  fetchData={fetchGetAllCategories}
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

export default CategoryList;