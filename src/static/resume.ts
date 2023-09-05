import { BlogsType } from '@/typings/blogTypes'

// create placeholder for blog posts
const blogs: BlogsType[] = [
    {
        slug: 'blog-1',
        title: 'Blog 1',
        posted: '2021-01-01',
        description: 'This is blog 1',
        markdown: 'This is blog 1',
    },
    {
        slug: 'blog-2',
        title: 'Blog 2',
        posted: '2021-01-02',
        description: 'This is blog 2',
        markdown: 'This is blog 2',
    },
]

export default blogs
