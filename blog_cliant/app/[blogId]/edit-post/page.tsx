// [blogId] に紐づいた blog編集ページ
import EditPostForm from "../../components/edit-post-form"
import { fetchBlog } from '../../custom-hooks'  // blogの個別ページを取得するカスタムフック
import { Post } from '../../types'

type PageProps = {
  params: {
    blogId: string  // ダイナミックセグメントの値を受け取る際の型定義
  }
}

export default async function EditPostPage({ params }: PageProps) {

  const blog: Post = await fetchBlog(params.blogId) // blogの個別ページを取得
  console.log(blog);

  return (
    <div className="m-10 text-center w-full">
      <h1 className="text-lg">ブログ編集</h1>
      <EditPostForm {...blog}/>
      {/* {...blog} はスプレッド構文。blogは、 id: title: completed:...などの複数のプロパティが内包されているオブジェクト。
        そのオブジェクト内の各プロパティを展開して EditPostForm コンポーネントに blog という名前で propsとして渡す書き方。
        blog オブジェクトのプロパティを個別に指定せずに一括してコンポーネントに渡すことができ、コードの可読性を高めつつ、冗長さを避けることができる。
        オブジェクトのプロパティが多くなる場合や、プロパティが変更された場合に都度修正する手間を省くため、{...blog} のように展開して一括で渡す方法が使われる。 */}
    </div>
  )
}