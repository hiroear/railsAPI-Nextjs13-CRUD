// ルートページ
import GetApiHello from './components/get-api-hello'

export default function Home() {

  return (
    <div className="m-10 text-center">
      <span className="text-lg">
        Click a title on the left to view detail 🚀
      </span>
      <h1 className='my-3'> ⬇︎ api/hello から取得した JSON データ</h1>
      <GetApiHello /> {/* api/helloのjsonを取得・表示 */}
    </div>
  )
}
