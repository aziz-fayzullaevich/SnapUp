import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from '../utils/apiURL';
import { STATUS } from "../utils/Status";

const initialState = {
    searchProducts: [],
    searchProductsStatus: STATUS.IDLE
};

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch', async (searchTerm) => {
    const response = await fetch(`${BASE_URL}/products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.searchProducts = [];
        },
        // добавьте setSearchTerm, если он необходим
        setSearchTerm: (state, action) => {
            // реализация вашего редюсера
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncSearchProduct.pending, (state) => {
                state.searchProductsStatus = STATUS.LOADING;
            })
            .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
                state.searchProducts = action.payload;
                state.searchProductsStatus = STATUS.SUCCEEDED;
            })
            .addCase(fetchAsyncSearchProduct.rejected, (state) => {
                state.searchProductsStatus = STATUS.FAILED;
            });
    }
});

export const { clearSearch, setSearchTerm } = searchSlice.actions; // убедитесь, что setSearchTerm экспортируется
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) => state.search.searchProductsStatus;
export default searchSlice.reducer;