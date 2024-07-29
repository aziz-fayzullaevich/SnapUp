import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/Status";

const initialState = {
    categories: [],
    categoriesStatus: STATUS.IDLE,
    categoryProducts: [],
    categoryProductsStatus: STATUS.IDLE
};

export const fetchAsyncCategories = createAsyncThunk('categories/fetch', async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    const data = await response.json();
    return data.map(category => ({
        slug: category.slug,
        name: category.name
    }));
});

const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncCategories.pending, (state) => {
                state.categoriesStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.categoriesStatus = STATUS.SUCCEEDED;
            })
            .addCase(fetchAsyncCategories.rejected, (state) => {
                state.categoriesStatus = STATUS.FAILED;
            })
            .addCase(fetchAsyncProductsOfCategory.pending, (state) => {
                state.categoryProductStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
                state.categoryProduct = action.payload;
                state.categoryProductStatus = STATUS.SUCCEEDED;
            })
            .addCase(fetchAsyncProductsOfCategory.rejected, (state) => {
                state.categoryProductStatus = STATUS.FAILED;
            });
    }
});
export const fetchAsyncProductsOfCategory = createAsyncThunk('category-products/fetch', async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await response.json();
    return data.products;
});

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) => state.category.categoryProduct;
export const getCategoryProductStatus = (state) => state.category.categoryProductStatus;
export default CategorySlice.reducer;