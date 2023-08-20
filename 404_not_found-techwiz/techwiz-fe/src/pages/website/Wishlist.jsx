import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../../context/ContextProvider.jsx";
import BannerComponent from "../../components/BannerComponent.jsx";
import {FINAL_URL_CUSTOMER} from "../../utils/setting-data.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchGetAllProductInWishlistByUserId,
    fetchRemoveProductFromWishListByUserId, selectWishList
} from "../../redux/slices/wishListSlice.jsx";
import {BsFillCartFill, BsFillTrashFill} from "react-icons/bs";
import {toast} from "react-toastify";

const Wishlist = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {userId} = useContext(Context)
    const [listProductInWishlist, setListProductInWishList] = useState([])
    const [sortField, setSortField] = useState("updatedAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const wishList = useSelector(selectWishList)
    const status = useSelector((state) => state.wishlist.status)
    const totalItems = useSelector((state) => state.wishlist.totalItems)
    const totalPages = useSelector((state) => state.wishlist.totalPages)

    useEffect(() => {
        dispatch(fetchGetAllProductInWishlistByUserId({userId, pageNumber, perPage, sortField, sortDir}))
    }, [])

    useEffect(() => {
        if (wishList && wishList.length >= 0) {
            setListProductInWishList(wishList)
        }
    }, [wishList])

    const handleAddToCart = (data) => {
   
    }
    const handleGoToCategory = () => {
        const id = 1
        const slug = 'abcd'
        navigate(`/categories/*`)
    }
    const handleRemoveProductInWishlist = async (productId) => {
        let res = await dispatch(fetchRemoveProductFromWishListByUserId({userId, productId})).unwrap()
        if (res && res.code === 200) {
            toast.success(res.message);

        } else {
            toast.error(res.message);
        }
    }

    return (
        <>
            <BannerComponent listBreadcrumb={listBreadcrumb()}/>
            <section className={`w-full mt-[40px] p-0`}>
                <div className={`max-w-[1280px] md:px-[15px] mx-auto my-0`}>
                    <div className={`wishlist_page`}>
                        <div className={`wishlist_container container mx-auto xl:px-30 py-20`}>
                            <div className={`wishlist_content`}>
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-2 py-2 w-40">
                                            Product Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Info Product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <span className="sr-only">Action</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        listProductInWishlist.length > 0 && listProductInWishlist.map((item, index) => {
                                            return <tr className="bg-white border-b hover:bg-gray-50 " key={index}>
                                                <td scope="row"
                                                    className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                                    <img onClick={() => navigate(`/products/product-detail/${item.id}/${item.slug}`)} className={`cursor-pointer rounded-xl`} src={item.imageProductPath} alt={``}/>
                                                </td>
                                                <td scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    <div>
                                                        <h3 onClick={() => navigate(`/products/product-detail/${item.id}/${item.slug}`)} className={`font-semiBold cursor-pointer text-xl`}>{item.name}</h3>
                                                        <div className={`flex items-center font-light text-xs mb-2`}>
                                                            <div className={`mr-4 font-medium`}>code: <span className={`font-normal hover:text-dangerColor-default_2 hover:underline cursor-pointer`}> {item.code}</span> </div>
                                                            <div className={` font-medium`}>category: <span onClick={() => handleGoToCategory()} className={`font-normal hover:text-dangerColor-default_2 hover:underline cursor-pointer`}> {item.category}</span> </div>
                                                        </div>
                                                        <div className={`font-medium text-dangerColor-default_2 text-2xl`}>$ {item.price}</div>
                                                        <div className={`font-light text-xs`}>{item.createdAt}</div>
                                                    </div>

                                                </td>
                                                <td className="px-6 py-4 text-left">
                                                    <div className={`flex items-center`}>
                                                        <div onClick={() => handleAddToCart(item)}
                                                             className={`flex justify-center items-center text-[14px] leading-tight font-semiBold mt-[10px] mr-[15px] mb-[10px] py-[17px] px-[32px] border-0 rounded-full text-whiteColor duration-300 bg-lime-600 hover:bg-lime-700 cursor-pointer`}>
                                                            <BsFillCartFill className={`mr-2`}/>
                                                            Add to cart
                                                        </div>
                                                        <div onClick={() => handleRemoveProductInWishlist(item.id)}
                                                             className={`flex justify-center items-center text-[14px] leading-tight font-semiBold mt-[10px] mr-[15px] mb-[10px] py-[17px] px-[32px] border-0 rounded-full text-whiteColor duration-300 bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 cursor-pointer`}>
                                                            <BsFillTrashFill className={`mr-2`}/>
                                                            Remove
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
const listBreadcrumb = () => {
    return [
        {
            name: "",
            path: `${FINAL_URL_CUSTOMER}`
        },
        {
            name: "My wishlist",
            path: "/v1/user/wishlist"
        },
    ]
}
export default Wishlist;