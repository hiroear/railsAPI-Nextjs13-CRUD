// 左サイドバーのブログ一覧のタイトルをクリックすると、それぞれのブログの個別ページに対応した詳細ページを SSGで遷移・表示するコンポーネント
import { Post } from "../types"
import format from "date-fns/format"
import Link from "next/link"
import { fetchBlog } from '../custom-hooks'  // blogの個別ページを取得するカスタムフック
import DeleteBtn from "../components/delete-btn"

/* ユーザーが /[blogId] にアクセスすると、params.blogId には、[blogId] の値が入る。
このように、ダイナミックセグメントの値を受け取る際は、PageProps の params プロパティを使い、型定義しておく必要がある
PageProps: Next.jsが提供する型定義。  params: ダイナミックセグメントの値を受け取るためのプロパティ */
type PageProps = {
  params: {
    blogId: string // ダイナミックセグメントの値を受け取る際の型定義
  }
}

/* ビルド時に SSG(静的生成)で blogの個別ページを生成するためには、事前にそれぞれの blog_idの一覧を取得しておく必要がある。
  Next.js12では、getStaticPaths()を使って、id一覧を生成・取得していたが、 Next.js13 からは generateStaticParams()を使う。
  generateStaticParams()の中で、ダイナミックセグメントと紐づくプロパティに値を入れ込み、それを returnすることで、事前情報(blog一覧の全id)が Next.jsに伝わり、それぞれの個別ページの HTMLを事前に生成し、SSGでレンダリングできるようになる。
*/
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3001/api/v1/posts/", {
    cache: "no-cache",
  })
  if (!res.ok) {
    throw new Error('Failed to fetch blogs in server')
  }
  const blogs: Post[] = await res.json()

  return blogs.map((blog) => ({
    blogId: blog.id.toString(),
    // blogId: ダイナミックセグメントの値と紐づくプロパティ。ダイナミックセグメントの値(id)は、文字列型なので blog.idを文字列に変換
  }))
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await fetchBlog(params.blogId) // blogの個別ページを取得 (カスタムフック)

  return (
    <div className="mt-16 border-2 rounded p-8 w-96">
      <p>
        <strong className="mr-3">blog ID:</strong>{blog.id}
      </p>
      <p>
        <strong className="mr-3">Title:</strong>{blog.title}
      </p>
      <p>
        <strong className="mr-3">Content:</strong>{blog.content}
      </p>
      <p>
        <strong className="mr-3">Created at:</strong>
        {blog && format(new Date(blog.created_at), "yyyy年M月d日 HH:mm")}
      </p>

      {/* ブログ一覧に戻るボタン */}
      <Link href={`/`}>戻る</Link><br/>
      <Link href={`/${blog.id}/edit-post`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </Link><br/>

      <DeleteBtn blogId={params.blogId} />
    </div>
  )
}