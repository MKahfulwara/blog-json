import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../ReduxStore/slices/blogSlice'
import BlogCard from './BlogCard'
import { Card, CardContent, Grid, Pagination, Stack, TextField, Typography } from '@mui/material'
import LoaderComponent from '../components/Loader'
const Blog = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])

  const handlePageChange = (event, value) => {
    setPageNumber(value)
  }
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(fetchPosts(pageNumber))
    setFilteredPosts(posts)
  }, [dispatch, pageNumber])

  useEffect(() => {
    if (posts.length) setFilteredPosts(posts)
  }, [posts])

  const handleSearch = (event) => {
    const searchQuery = event.target.value
    setSearchText(searchQuery)
    const filtered = posts.filter(
      (post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }

  return (
    <Grid containter spacing={2}>
      <TextField label='Search' value={searchText} onChange={handleSearch} sx={{ alignSelf: 'center', marginLeft: '30px', width: '80%' }} />
      {isLoading ? (
        <Grid item xs={12} spacing={3}>
          <Grid container justify='center' spacing={5}>
            {filteredPosts.map((post) => (
              <Card sx={{ maxWidth: 350, margin: 10 }}>
                <CardContent key={post.id}>
                  <Typography variant='h5'>{post.title}</Typography>
                  <Typography color='text.secondary'>{post.body}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Stack spacing={3} style={{ marginTop: '11rem' }}>
            <Pagination count={10} page={pageNumber} onChange={handlePageChange} shape='rounded' showFirstButton showLastButton />
          </Stack>
        </Grid>
      ) : (
        <LoaderComponent />
      )}
    </Grid>
  )
}

export default Blog
