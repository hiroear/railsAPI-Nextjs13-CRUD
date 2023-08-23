// blogId に一致するブログを取得する
export const fetchBlog = async (blogId: string) => {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${blogId}`, {
    cache: "no-cache",
  })
  if (!res.ok) {
    throw new Error('Failed to fetch blog in server')
  }
  const blog = await res.json()
  return blog
}