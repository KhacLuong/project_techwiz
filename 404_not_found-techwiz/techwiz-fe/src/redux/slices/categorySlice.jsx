import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
const initialState = {
    list: [],
    totalPages: 0,
    totalItems: 0,
    status: 'idle',
}

export const fetchGetAllCategories = createAsyncThunk('category/getAll', async ({pageNumber = 1, perPage = 6, sortField = '', sortDir = ''}) => {
    try {
        return await instance.get(`categories?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveCategory = createAsyncThunk('category/remove', async ({id}) => {

    try {
        return await instance.delete(`categories?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetCategoriesWithParentAndCountOfProduct = createAsyncThunk('category/get-all-category-with-count-product', async () => {
    try {
        return await instance.get(`categories/get-list-category-with-children-and-count-product`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetCategoryById = createAsyncThunk('category/get', async ({id}) => {
    try {
        return await instance.get(`categories/${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchCreateCategory = createAsyncThunk('category/create' , async ({data}) => {
    try {
        return await instance.post(`categories`, data)
    } catch (err) {
        console.error(err)
    }
})
export const fetchUpdateCategory = createAsyncThunk('category/update' , async ({data}) => {
    try {
        return await instance.put(`categories`, data)
    } catch (err) {
        console.error(err)
    }
})
export const getListCategoryExceptId = createAsyncThunk(
    'category/get-category-except-id', async ({id}) => {
        try {
            return await instance.get(`categories/get-all-except-id/${id}`)
        } catch (err) {
            console.error(err)
        }
    }
)
export const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetAllCategories.fulfilled, (state, action) => {
                if (action.payload && action.payload.code === 200) {
                    state.list = action.payload.data
                    state.totalItems = action.payload.totalItems
                    state.totalPages = action.payload.totalPages
                }
                state.status = 'succeeded'
            })
            .addCase(fetchGetAllCategories.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveCategory.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveCategory.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveCategory.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectCategory = state => state.category.list

export default categorySlice.reducer