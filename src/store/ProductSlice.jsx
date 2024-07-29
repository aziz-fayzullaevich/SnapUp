import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from '../utils/Status';

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productsSingle: [],
    productsSingleStatus: STATUS.IDLE
};

export const fetchAsyncProducts = createAsyncThunk('products/fetch', async (limit) => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
    const data = await response.json();
    return data.products;
});

export const fetchAsyncProductsSingle = createAsyncThunk('product-single/fetch', async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    return data;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncProducts.pending, (state) => {
                state.productsStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.productsStatus = STATUS.SUCCEEDED;
            })
            .addCase(fetchAsyncProducts.rejected, (state) => {
                state.productsStatus = STATUS.FAILED;
            })
            .addCase(fetchAsyncProductsSingle.pending, (state) => {
                state.productsSingleStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncProductsSingle.fulfilled, (state, action) => {
                state.productsSingle = action.payload;
                state.productsSingleStatus = STATUS.SUCCEEDED;
            })
            .addCase(fetchAsyncProductsSingle.rejected, (state) => {
                state.productsSingleStatus = STATUS.FAILED;
            });
    }
});

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productsSingle;
export const getProductsSingleStatus = (state) => state.product.productsSingleStatus;
export default productSlice.reducer;
