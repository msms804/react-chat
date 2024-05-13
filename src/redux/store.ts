import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface RootState {
    menu: ReturnType<typeof menuReducer>;
    // 다른 리듀서가 있다면 여기에 추가
}

interface MenuState {
    selectedMenu: string;
}
const initialState: MenuState = {
    selectedMenu: 'chat',
}
const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setSelectedMenu(state, action: PayloadAction<string>) {
            state.selectedMenu = action.payload;
        }
    }
})

export const { setSelectedMenu } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
const store = configureStore({
    reducer: {
        menu: menuReducer // 슬라이스 리듀서 등록
    }
})

export default store;
export type { RootState };