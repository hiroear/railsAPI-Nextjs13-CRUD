import CreatePostForm from "../components/create-post-form"


export default function CreatePostPage() {

  return (
    <div className="m-10 text-center w-full">
      <h1 className="text-lg">ブログ新規投稿</h1>
      <CreatePostForm />
    </div>
  )
}