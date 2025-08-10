import { LogoSvg } from "@/assets/svg";
import { InputWithLabel } from "@/components/main/InputWithLabel";
import { Button } from "@/components/ui/button";
import { useLoginContext } from "@/contexts/LoginContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLoginContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    await handleLogin();
    navigate("/");
  };

  return (
    <div className="size-full flex bg-hero-pattern bg-center">
      <div className="flex size-full bg-primary-black-100/65">
        <form
          onSubmit={handleSubmit}
          className="m-auto flex flex-col gap-8 w-[450px] h-[450px] border-8 border-white/15 bg-black p-10"
        >
          <div className="flex items-center gap-2">
            <LogoSvg className="size-[70px]" />
            <div className="text-white font-medium text-[36px]">
              Hexapixel Web
            </div>
          </div>
          <div className="size-full flex flex-col gap-6 justify-center">
            <InputWithLabel
              label={"Username"}
              placeholder={"Username"}
              labelProps={{
                className: "text-white",
              }}
              inputProps={{
                className: "bg-white/20 border-white/15 text-white",
                value: username,
                onChange: (e) => setUsername(e.target.value),
              }}
            />
            <InputWithLabel
              label={"Password"}
              placeholder={"Password"}
              labelProps={{
                className: "text-white",
              }}
              inputProps={{
                type: "password",
                className: "bg-white/20 border-white/15 text-white",
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
          </div>
          <div className="mt-auto w-full">
            <Button
              disabled={!username || !password}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
