import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";

const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}
export const fetchGetTrendingProduct = createAsyncThunk('product/get-trending', async () => {
    let url = `pageNumber=1&perPage=6&sortField=createdAt&sortDir=desc&hot=true`
    try {
        return await instance.get(`products/search_filter?${url}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetSellingProduct = createAsyncThunk('product/get-selling', async () => {
    let url = `pageNumber=1&perPage=6&sortField=priceFrom&sortDir=desc&hot=true`
    try {
        return await instance.get(`products/search_filter?${url}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetAllProduct = createAsyncThunk('product/get-product-with-search-filter', async ({pageNumber, perPage, sortField, sortDir, keyword, colors, sizes, categoryIds, branchIds, typeIds, enable, hot,priceMax, priceMin}) => {
    try {
        let url = `pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&priceMax=${priceMax}&priceMin=${priceMin}`
        if (keyword !== '') {
            url += `&keyword=${keyword}`
        }
        if (colors !== '') {
            url += `&colors=${colors}`
        }
        if (sizes !== '') {
            url += `&sizes=${sizes}`
        }
        if (categoryIds !== '') {
            url += `&categoryIds=${categoryIds}`
        }
        if (branchIds !== '') {
            url += `&branchIds=${branchIds}`
        }
        if (typeIds !== '') {
            url += `&typeIds=${typeIds}`
        }
        if (enable) {
            url += `&enable=${enable}`
        }
        if (hot) {
            url += `&hot=${hot}`
        }

        return await instance.get(`products/search_filter?${url}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetProductDetail = createAsyncThunk('product/detail', async ({id}) => {
    try {
        return await instance.get(`products/${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetAllProduct.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetAllProduct.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchGetTrendingProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetTrendingProduct.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetTrendingProduct.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectProduct = state => state.product.list

export default productSlice.reducer