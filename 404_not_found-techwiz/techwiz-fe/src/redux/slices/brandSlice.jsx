import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}

export const fetchGetAllBrands = createAsyncThunk('brand/getAll', async ({}) => {
    try {

    } catch (err) {
        console.error(err)
    }
})

export const fetchGetBrandWithCountProduct = createAsyncThunk('brand/get-brand-with-count-product', async () => {
    try {
        return await instance.get(`brands/get-list-brand-with-count-product`)
    } catch (err) {
        console.error(err)
    }
})

export const brandSlice = createSlice({
    name: 'Brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllBrands.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetAllBrands.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetAllBrands.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectBrand = state => state.brand.list

export default brandSlice.reducer