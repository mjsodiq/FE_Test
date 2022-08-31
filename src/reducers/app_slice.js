import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ruasGet = createAsyncThunk("dashboard/ruasGET", async () => {
    try {
        const response = await axios.get(`https://630c319983986f74a7bb0dc5.mockapi.io/jm/ruas/ruas`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const ruasCreate = createAsyncThunk("dashboard/ruasCREATE", async (newData) => {
    const response = await axios.post(`https://630c319983986f74a7bb0dc5.mockapi.io/jm/ruas/ruas`, newData);
    return response.data;
});

export const ruasUpdate = createAsyncThunk("dashboard/ruasUPDATE", async (newData) => {
    const id = newData.id;
    const response = await axios.put(`https://630c319983986f74a7bb0dc5.mockapi.io/jm/ruas/ruas/${id}`, newData);
    return response.data;
});

export const ruasDelete = createAsyncThunk("dashboard/ruasDELETE", async (newData) => {
    const id = newData.id;
    const response = await axios.delete(`https://630c319983986f74a7bb0dc5.mockapi.io/jm/ruas/ruas/${id}`);
    return response.data;
});

const app_slice = createSlice({
    name: "app_slice",
    initialState: {
        current_user: "test",
        modal_isActive: false,
        activated_modal: { name: "TambahRuas", data: {} }, // ["", "TambahRuas", "HapusRuas", "DetailRuas", "Gambar"]
        default_style: {},
        dataRuas: [],
    },
    reducers: {
        modal_changeState: (state, action) => ({ ...state, modal_isActive: !state.modal_isActive }),
        activated_modal_changed: (state, action) => {
            return {
                ...state,
                activated_modal: {
                    ...state.activated_modal,
                    name: action.payload.currentActiveModal,
                    data: action.payload.data,
                },
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ruasGet.fulfilled, (state, action) => {
                return { ...state, dataRuas: action.payload };
            })
            .addCase(ruasGet.rejected, (state, action) => {})
            .addCase(ruasCreate.fulfilled, (state, action) => {
                state.modal_isActive = false;
                state.dataRuas = [...state.dataRuas, action.payload];
            })
            .addCase(ruasUpdate.fulfilled, (state, action) => {
                const dataRuas = [...state.dataRuas];
                const newDataRuas = dataRuas.map((data) => {
                    if (data.id === action.payload.id) {
                        return { ...action.payload };
                    } else {
                        return data;
                    }
                });
                state.modal_isActive = false;
                state.dataRuas = newDataRuas;
            })
            .addCase(ruasDelete.fulfilled, (state, action) => {
                const dataRuas = [...state.dataRuas];
                const newDataRuas = dataRuas.filter((item) => item.id !== action.payload);
                state.modal_isActive = false;
                state.dataRuas = newDataRuas;
            });
    },
});
export const { modal_changeState, activated_modal_changed } = app_slice.actions;
export default app_slice.reducer;
