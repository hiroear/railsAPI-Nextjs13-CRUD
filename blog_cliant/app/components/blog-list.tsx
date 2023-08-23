// railsの indexアクションから blogの一覧を取得して表示するサーバーコンポーネント
import Link from "next/link"
import { format } from "date-fns"; // date-fnsからformat関数をインポート
import { Post } from "../types"    // Post型をインポート

// blogの一覧を rails の postsコントローラー index から取得する関数
async function fetchBlogs() {
  const res = await fetch("http://localhost:3001/api/v1/posts/", {
    // next: { revalidate: 60 * 60 * 24 }, // 一日に一回更新
    cache: "no-cache", // キャッシュを使わない
  })
  if (!res.ok) {
    // throw new Error() : 関数の実行を止めて、関数の呼び出し元で try-catch でキャッチしてエラーを投げる (関数の中でしか使えない)
    throw new Error('Failed to fetch blogs in server')
  }
  const blogs: Post[] = await res.json()  // 取得に成功したら、取得結果を JSON に変換して blogs に代入
  return blogs      // 取得した JSON形式の blogs の一覧を返す
}


export default async function BlogList() {
  const blogs = await fetchBlogs() // blogs一覧を取得

  return (
    <>
      <Link href={"/"} className="my-5 pb-3 text-xl font-medium underline underline-offset-4">
        Blogs
      </Link>
      <br/><br/>
      <Link href="/create-post" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Create New Post
      </Link>
      <ul className="m-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="my-5 text-base">
            {/* Linkコンポーネントの prefetchプロパティを false にすると、リンク先のページのデータを事前に取得しないようにできる (デフォルトで true になっている) */}
            <Link prefetch={false} href={`/${blog.id}`}>{blog.title}</Link>
            <p>
              <strong className="mr-3">Created at:</strong>
              {format(new Date(blog.created_at), "yyyy年M月d日 HH:mm")}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}