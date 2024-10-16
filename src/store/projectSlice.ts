import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aoi: null,
    grid: null
}

const ProjectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
      setAOI(state, action) {
        state.aoi = action.payload;
      },
      setGrid(state, action) {
        state.grid = action.payload;
      },
    }
});

export const { setAOI, setGrid } = ProjectSlice.actions;
export default ProjectSlice;
