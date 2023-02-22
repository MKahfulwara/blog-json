import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function BlogCard({ title, body }) {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardContent>
        <Typography variant='h5'>{title}</Typography>
        <Typography color='text.secondary'>{body}</Typography>
      </CardContent>
    </Card>
  )
}
