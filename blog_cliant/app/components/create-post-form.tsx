'use client'
import { ChangeEvent, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function CreatePostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  // ↓ フォームの入力値を POST で postsコントローラーの createクションに送信する関数
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // ページ遷移を防ぐ
    // ↓ axios を使う書き方
    try {
      await axios.post('http://localhost:3001/api/v1/posts', {
        title: title,
        content: content
      })
      router.push('/') // 投稿に成功したら、ルートページに遷移
      router.refresh() // ルートページに遷移したら、ルートページをリフレッシュ
    } catch (err) {
      alert("投稿に失敗しました");
    }
    /* ↓ fetch を使う書き方
    const res = await fetch('http://localhost:3001/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    })
    if (!res.ok) {
      throw new Error('Failed to fetch posts in client')
    }
    const post = await res.json()
    console.log(post)
    */
  }

  return (
    <div>
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
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          投稿
        </button>
      </form>
    </div>
  )
}