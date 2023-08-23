// [blogId] に紐づいた blog編集フォーム
'use client'
import { ChangeEvent, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Post } from '../types'

// 親コンポーネントから渡ってくる propsの型を定義
type Props = {
  id: string;
  title: string;
  content: string;
};

export default function EditPostForm( blog : Props ) {
  const { id, title: initialTitle, content: initialContent } = blog // 分割代入で、blogの各プロパティを展開・初期値を取得 （ id, title, content）
  console.log(blog);
  const router = useRouter()

  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  // 入力した値を PUT で postsコントローラーの updateアクションに送信する関数
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // ページ遷移を防ぐ
    try {
      await axios.put(`http://localhost:3001/api/v1/posts/${id}`, {
        title: title,
        content: content
      })
      router.push(`/${id}`)        // 投稿に成功したら、個別ページに遷移
      router.refresh()                 // 個別ページに遷移したら、ルートページをリフレッシュ
    } catch (err) {
      alert("投稿に失敗しました");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="w-1/5">タイトル</label>
      <input type="text" name="title"
        className='my-2 mx-2 rounded border border-gray-300 px-3 py-2 placeholder-gray-500 w-4/5'
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      /><br />

      <label className="w-1/5">本文</label>
      <textarea name="content"
        className='my-2 mx-2 rounded border border-gray-300 px-3 py-2 placeholder-gray-500 w-4/5'
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
      /><br />

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        編集
      </button>
    </form>
  )
}