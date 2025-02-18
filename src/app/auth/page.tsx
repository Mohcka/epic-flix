"use client";

import axios from "axios";
import { useCallback, useState } from "react";
// import { NextPageContext } from 'next';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";

// import Input from '@/components/Input';
import Image from "next/image";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }

interface Inputs {
  email: string;
  password: string;
  name: string;
}

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const signUpSchema = SignInSchema.extend({
  name: z.string().min(3),
});

const authSchema = (ignoreName: boolean) =>
  z.object({
    email: z.string().email(),
    password: z.string().min(3),
    ...(ignoreName ? {} : { name: z.string().min(3) }),
  });

const AuthSignUpSchema = authSchema(false);
const AuthSignInSchema = authSchema(true);
type AuthSignupForm = z.infer<typeof AuthSignUpSchema>;
type AuthSignInForm = z.infer<typeof AuthSignInSchema>;
type AuthVarient = "login" | "register";

const Auth = () => {
  const router = useRouter();

  const [authVariant, setAuthVariant] = useState<AuthVarient>("login");

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSignupForm | AuthSignInForm>({
    resolver: zodResolver(authSchema(authVariant !== "register")),
  });

  const toggleVariant = useCallback(() => {
    setAuthVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback<SubmitHandler<AuthSignInForm>>(
    async ({ email, password }) => {
      console.log("logging in");
      if (!email!.length || !password!.length) {
        console.log("Email or password is empty");
        return;
      }

      try {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        router.push("/profiles");
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

  const registerUser = useCallback<SubmitHandler<AuthSignupForm>>(
    async ({ email, name, password }) => {
      console.log("registering user");
      try {
        await axios.post("/api/auth/register", {
          email,
          name,
          password,
        });

        login({ email, password });
      } catch (error) {
        console.log(error);
      }
    },
    [login]
  );

  if (session) {
    router.push("/profiles");
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-black/50 relative">
        <nav className="absolute">
          {/* <img src="/images/logo.png" className="h-12" alt="Logo" /> */}
        </nav>
        <div className="flex justify-center h-full">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {authVariant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {authVariant === "register" && (
                <div className="relative">
                  <input
                    {...register("name")}
                    className="
                    block
                    rounded-md
                    px-6
                    pt-6
                    pb-1
                    w-full
                    text-md
                  text-white
                  bg-neutral-700
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    peer
                    invalid:border-b-1
                    "
                    placeholder=" "
                  />
                  <label
                    htmlFor="Name"
                    className="
                    absolute 
                    text-md
                  text-zinc-400
                    duration-150 
                    transform 
                    -translate-y-3 
                    scale-75 
                    top-4 
                    z-10 
                    origin-[0] 
                    left-6
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75
                    peer-focus:-translate-y-3
                  "
                  >
                    Name
                  </label>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className="
                  block
                  rounded-md
                  px-6
                  pt-6
                  pb-1
                  w-full
                  text-md
                  text-white
                  bg-neutral-700
                  appearance-none
                  focus:outline-none
                  focus:ring-0
                  peer
                  invalid:border-b-1
                "
                  placeholder=""
                />
                <label
                  htmlFor="Email"
                  className="
                  absolute 
                  text-md
                  text-zinc-400
                  duration-150 
                  transform 
                  -translate-y-3 
                  scale-75 
                  top-4 
                  z-10 
                  origin-[0] 
                  left-6
                  peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75
                  peer-focus:-translate-y-3
                "
                >
                  Email
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type="password"
                  {...register("password")}
                  className="
                  block
                  rounded-md
                  px-6
                  pt-6
                  pb-1
                  w-full
                  text-md
                  text-white
                  bg-neutral-700
                  appearance-none
                  focus:outline-none
                  focus:ring-0
                  peer
                  invalid:border-b-1
                "
                  placeholder=""
                />
                <label
                  htmlFor="Password"
                  className="
                  absolute 
                  text-md
                  text-zinc-400
                  duration-150 
                  transform 
                  -translate-y-3 
                  scale-75 
                  top-4 
                  z-10 
                  origin-[0] 
                  left-6
                  peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75
                  peer-focus:-translate-y-3
                "
                >
                  Password
                </label>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={
                authVariant === "login"
                  ? handleSubmit(login)
                  : handleSubmit(registerUser)
              }
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {authVariant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="
                w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition"
              >
                <FaGithub size={32} color="#000" />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {authVariant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {authVariant === "login" ? "Create an account" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
