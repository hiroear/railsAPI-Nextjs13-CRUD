'use client'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface Props {
  blogId: string;
}

export default function DeleteBtn({ blogId }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${blogId}`)
      router.push(`/`)        // 投稿に成功したら、個別ページに遷移
      router.refresh()        // 遷移したら、ルートページをリフレッシュ
    } catch (err) {
      alert("投稿に失敗しました");
    }
  }

  return (
    <>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  )
}