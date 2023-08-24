// HTTPメソッドごとに対応する名前を持つ関数をエクスポートできるので、GETリクエストを作成したい場合はGET関数をエクスポート
// POSTリクエストを作成したい場合はPOST関数をエクスポートする
import { NextResponse } from "next/server"

const data = [
  { id: 1, name: 'John', period: '2021-01-01' },
  { id: 2, name: 'Mike', period: '2021-01-02' },
  { id: 3, name: 'Amy', period: '2021-01-03' },
]

// localhost:3000/api/hello にアクセスすると、dataの内容がJSON形式で表示される (このファイルがあるディレクトリ名がエンドポイント名になる)
export async function GET(request: Request) {
  return NextResponse.json(data)
}

// JSONデータを追加(POST関数)
export async function POST(request: Request) {
  const requestBody = await request.json(); // リクエストボディをJSONとしてパース

  // リクエストボディからデータを抽出
  const { id, name, period } = requestBody;

  // 新しいデータを追加
  const newData = { id, name, period };
  data.push(newData);

  return new Response(JSON.stringify(newData), { status: 201 }); // 201 Createdを返す
}




