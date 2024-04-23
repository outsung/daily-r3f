import { useAppStore } from "@/store/app";
import { Button, Input, notification } from "antd";
import { useState } from "react";

const url = "https://expressjs-on-koyeb-outsung.koyeb.app";

export function Login() {
  const setToken = useAppStore((state) => state.setToken);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const login = async ({ name, code }) => {
    const res = await fetch(url + "/api/v1/auth/login", {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: "POST",
      body: JSON.stringify({ email: name, code: code }),
    }).then((res) => res.json());

    if (res.result) {
      setToken(res.result.token.token);
    } else {
      console.log(res);
      notification.error({ message: "잘못된 로그인 정보입니다." });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>로그인해주세요</div>
      <div className="w-72">
        {/* <Input
          placeholder="name"
          style={{ margin: "12px 0px" }}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="code"
          style={{ margin: "12px 0px" }}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          type="primary"
          block
          style={{ margin: "12px 0px" }}
          onClick={() => login({ name, code })}
        >
          로그인
        </Button>
         */}

        <Button
          type="primary"
          block
          style={{ margin: "12px 0px" }}
          onClick={() => login({ name: "Witch", code: "123456" })}
        >
          test 1
        </Button>
        <Button
          type="primary"
          block
          style={{ margin: "12px 0px" }}
          onClick={() => login({ name: "Bear", code: "123456" })}
        >
          test 2
        </Button>
        <Button
          type="primary"
          block
          style={{ margin: "12px 0px" }}
          onClick={() => login({ name: "Duck", code: "123456" })}
        >
          test 3
        </Button>
        <Button
          type="primary"
          block
          style={{ margin: "12px 0px" }}
          onClick={() => login({ name: "Dog", code: "123456" })}
        >
          test 4
        </Button>
      </div>
    </div>
  );
}
