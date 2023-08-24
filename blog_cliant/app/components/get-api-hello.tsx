'use client'
import { useState, useEffect } from 'react'
import PostApiHello from './post-api-hello'

// api/helloのjsonの型を定義
type Hello = {
  id: number;
  name: string;
  period: string;
}

export default async function GetApiHello() {
  const [data, setData] = useState<Array<Hello>>([]) // api/helloの jsonの dataを格納するステートを定義

  // api/helloの jsonの dataを取得する関数
  const fetchApiHello = async () => {
    const res = await fetch('http://localhost:3000/api/hello')
    const responseData: Hello[] = await res.json();
    setData(responseData); // ステートにデータをセット
  }

  useEffect(() => {
    fetchApiHello() // マウント時に一回だけ実行
  } ,[])

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.id}
            {item.name}
            {item.period}
          </li>
        ))}
      </ul>
      <PostApiHello data={data} />
    </div>
  )

}