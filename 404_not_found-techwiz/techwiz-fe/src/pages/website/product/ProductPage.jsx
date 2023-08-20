import React, {useEffect, useState} from 'react';
import BannerComponent from "../../../components/BannerComponent.jsx";
import ProductFilter from "./ProductFilter.jsx";
import ProductList from "./ProductList.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchGetCategoriesWithParentAndCountOfProduct} from "../../../redux/slices/categorySlice.jsx";
import {fetchGetBrandWithCountProduct} from "../../../redux/slices/brandSlice.jsx";
import {fetchGetTypeWithCountProduct} from "../../../redux/slices/typeSlice.jsx";
import {FINAL_URL_CUSTOMER} from "../../../utils/setting-data.jsx";
import {fetchGetAllProduct, selectProduct} from "../../../redux/slices/productSlice.jsx";

const ProductPage = () => {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [types, setTypes] = useState([])
    const [products, setProducts] = useState([])
    const productSlice = useSelector(selectProduct)
    const [sortField, setSortField] = useState("createdAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const [keyword, setKeyword] = useState('')
    const [colors, setColors] = useState('')
    const [sizes, setSizes] = useState('')
    const [categoryIds, setCategoryIds] = useState('')
    const [branchIds, setBranchIds] = useState('')
    const [typeIds, setTypeIds] = useState('')
    const [hot, setHot] = useState(true)
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(5000)
    const [price, setPrice] = useState([0, 5000])
    const [listFilter, setListFilter] = useState([])

    useEffect(() => {
        const test = async () => {
            await handleGetListCategory()
            await handleGetListBrand()
            await handleGetListType()
        }
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        test()
    }, [])

    useEffect(() => {
         dispatch(fetchGetAllProduct({
             pageNumber,
             perPage,
             sortField,
             sortDir,
             keyword,
             colors: encodeURIComponent(colors),
             sizes: encodeURIComponent(sizes),
             categoryIds: encodeURIComponent(categoryIds),
             branchIds: encodeURIComponent(branchIds),
             typeIds: encodeURIComponent(typeIds),
             enable: true,
             hot,
             priceMax,
             priceMin}))
    }, [pageNumber, perPage, sortField, sortDir, keyword, colors, sizes, categoryIds, branchIds, typeIds, hot, priceMax, priceMin])

    useEffect(() => {
        if (productSlice && productSlice.length >= 0) {
            setProducts(productSlice)
        }
    }, [productSlice])

    const handleFilterByPrice = () => {
        setPriceMin(price[0])
        setPriceMax(price[1])
    }
    const handleGetListCategory = async () => {
        const res = await dispatch(fetchGetCategoriesWithParentAndCountOfProduct()).unwrap()
        if (res && res.code === 200) {
            setCategories(res.data)
        }
    }
    const handleGetListBrand = async () => {
        const res = await dispatch(fetchGetBrandWithCountProduct()).unwrap()
        if (res && res.code === 200) {
            setBrands(res.data)
        }
    }
    const handleGetListType = async () => {
        const res = await dispatch(fetchGetTypeWithCountProduct()).unwrap()
        if (res && res.code === 200) {
            setTypes(res.data)
        }
    }

    return (
        <>
            <BannerComponent listBreadcrumb={listBreadcrumb("All Products")}/>
            <section className={`w-full md:px-[15px] max-w-[1280px] mx-auto my-0 grid grid-cols-4 gap-10`}>
                <ProductFilter categories={categories}
                               setCategories={setCategories}
                               brands={brands}
                               price={price}
                               setPrice={setPrice}
                               setPriceMax={setPriceMax}
                               setPriceMin={setPriceMin}
                               types={types}
                               setColors={setColors}
                               setSizes={setSizes}
                               setCategoryIds={setCategoryIds}
                               setBranchIds={setBranchIds}
                               setTypeIds={setTypeIds}
                               handleFilterByPrice={handleFilterByPrice}/>
                <ProductList products={products}
                             setSortField={setSortField}
                             setSortDir={setSortDir}
                             setPageNumber={setPageNumber}
                             setPerPage={setPerPage}
                             perPage={perPage}
                             setKeyword={setKeyword}
                             setHot={setHot}
                             setFirstItemPerPage={setFirstItemPerPage}
                             setLastItemPerPag={setLastItemPerPage}/>
            </section>
        </>
    );
};
const listBreadcrumb = (name) => {
    return [
        {
            name: "",
            path: `${FINAL_URL_CUSTOMER}`
        },
        {
            name: name,
            path: ""
        }
    ]
}
export default ProductPage;