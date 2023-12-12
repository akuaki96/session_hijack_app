import { NextApiRequest, NextApiResponse } from "next"; //Next.jsのAPIルートで使用されるリクエストとレスポンスの型
import { withIronSession, Session } from "next-iron-session";
import { randomBytes } from "crypto"; // Node.jsのcryptoモジュールからrandomBytesをインポート

//NextApiRequest型にsessionプロパティが存在しないためNextApiRequestを拡張
interface CustomNextApiRequest extends NextApiRequest {
  session: Session;
}

const VALID_USERNAME = "username";
const VALID_PASSWORD = "password";

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  // ユーザー名とパスワードが正しい場合
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // セッションにユーザー情報を設定する
    req.session.set("user", { username });

    // セッションを保存する
    await req.session.save();

    // ログイン成功のメッセージを含んだJSONレスポンスを返す
    return res.status(200).json({ message: "Logged in successfully" });
  }

  // ユーザー名とパスワードが正しくない場合
  // 認証エラーメッセージを含んだJSONレスポンスを返す
  return res.status(401).json({ message: "Invalid credentials" });
};

const randomPassword = randomBytes(32).toString("hex"); // ランダムな32文字のパスワードを生成
export default withIronSession(handler, {
  password: randomPassword, // セッションを暗号化するためのパスワード
  cookieName: "my-session-cookie", // クライアントに送信されるクッキーの名前
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // HTTPSでのみクッキーを送信する
  },
});
