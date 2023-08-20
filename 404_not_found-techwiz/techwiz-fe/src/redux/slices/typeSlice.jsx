import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}

export const fetchGetAllTypes = createAsyncThunk('type/getAll', async ({}) => {
    try {

    } catch (err) {
        console.error(err)
    }
})
export const fetchGetTypeWithCountProduct = createAsyncThunk('get-type-with-count-product', async () => {
    try {
        return await instance.get(`types/get-list-type-with-count-product`)
    } catch (err) {
        console.error(err)
    }
})

export const typeSlice = createSlice({
    name: 'Type',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllTypes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetAllTypes.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetAllTypes.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchGetTypeWithCountProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetTypeWithCountProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchGetTypeWithCountProduct.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectType = state => state.type.list

export default typeSlice.reducer