import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ログインボタンがクリックされた時の処理
  const handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST", //POSTリクエストを作成
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // ログイン成功時の処理
      router.push("/dashboard"); // ログイン成功後のページへリダイレクト
    } else {
      // ログイン失敗時の処理
      console.error("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
