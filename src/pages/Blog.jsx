import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../ReduxStore/slices/blogSlice'
import BlogCard from './BlogCard'
import { Grid, Pagination, Stack } from '@mui/material'
import LoaderComponent from '../components/Loader'
const Blog = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const handlePageChange = (event, value) => {
    setPageNumber(value)
  }
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.blog)
  console.log(posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch, pageNumber])

  return (
    <Grid containter spacing={2}>
      {isLoading ? (
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {posts.map((post) => (
              <BlogCard key={post.id} title={post.title} body={post.body} />
            ))}
          </Grid>
          {/* <Stack spacing={3} style={{ marginTop: '11rem' }}>
            <Pagination count={10} page={pageNumber} onChange={handlePageChange} shape='rounded' showFirstButton showLastButton />
          </Stack> */}
        </Grid>
      ) : (
        <LoaderComponent />
      )}
    </Grid>
  )
}

export default Blog
