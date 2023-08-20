import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";

const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}

export const fetchGetAllProductInWishlistByUserId = createAsyncThunk('get-wish-list-by-user-id', async ({userId, pageNumber, perPage, sortField, sortDir}) => {
    try {
        return await instance.get(`wishlists/user?userId=${userId}?pageNumber=${pageNumber}?perPage=${perPage}?sortField=${sortField}?sortDir=${sortDir}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveProductFromWishListByUserId = createAsyncThunk('delete-product-wishlist', async ({userId, productId}) => {
    try {
        return await instance.get(``)
    } catch (err) {
        console.error(err)
    }
})
export const fetchAddProductToWishlist = createAsyncThunk(
    'add-product-wishlist', async ({id}) => {
        try {

        } catch (err) {
            console.error(err)
        }
    }
)

export const wishListSlice = createSlice({
    name: 'Wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllProductInWishlistByUserId.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetAllProductInWishlistByUserId.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetAllProductInWishlistByUserId.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveProductFromWishListByUserId.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveProductFromWishListByUserId.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveProductFromWishListByUserId.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchAddProductToWishlist.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAddProductToWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchAddProductToWishlist.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectWishList = state => state.wishlist.list
export default wishListSlice.reducer