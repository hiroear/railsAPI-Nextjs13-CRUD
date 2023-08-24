'use client'
import { ChangeEvent, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

// api/helloのjsonの型を定義
type DataItem = {
  id: number;
  name: string;
  period: string;
}

// 親コンポーネントから渡ってくる propsの型を定義
type Props = {
  data: DataItem[];
}

export default function PostApiHello({ data }: Props) {
  console.log(data);
  const [postData, setPostData] = useState({data});
  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>('')
  const [period, setPeriod] = useState<string>('')
  const router = useRouter()


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // POSTリクエストを送信
      await axios.post('/api/hello', postData);
      console.log('Data sent successfully');
      // router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }


  const handleInputChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value); // 文字列を数値に変換
    setId(numericValue);                  // 数値に変換した value をセット
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputChangePeriod = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPeriod(value);
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className='my-3'>
      <form onSubmit={handleSubmit}>
        <input name="id" type="text" className='my-3 p-2 rounded' placeholder='id' value={id} onChange={handleInputChangeId}/>
        <br/>
        <input name="name" type="text" className='my-3 p-2 rounded' placeholder='name' value={name} onChange={handleInputChangeName} />
        <br/>
        <input name="period" type="text" className='my-3 p-2 rounded' placeholder='period' value={period} onChange={handleInputChangePeriod} />
        <br/>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          jsonデータ送信
        </button>
      </form>
    </div>
  )
}