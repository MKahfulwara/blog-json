import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//--Posts--//
const fetchPosts = createAsyncThunk('post/posts', async (values, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`) //?_page=${pageNumber}&_limit=${limit}
    return data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const blogSlice = createSlice({
  name: 'post',
  initialState: { posts: [], isLoading: false },

  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.isLoading = false
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload
      state.isLoading = true
    },
    [fetchPosts.rejected]: (state, action) => {
      console.log(action.payload)
    },
  },
})

export { blogSlice, fetchPosts }