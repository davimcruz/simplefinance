import { GetServerSideProps } from "next"
import Router from "next/router"
import { Inter } from "next/font/google"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme/toggleTheme"
import { ThemeProvider } from "@/components/theme/theme-provider"

import { verifyToken } from "@/pages/api/Auth/jwtAuth"

import "../../../app/globals.css"

const inter = Inter({ subsets: ["latin"] })

const goDashboard = () => {
  Router.push("/dashboard")
}

const SuccessLogin = () => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div
        className={`${inter.className} flex items-center justify-center max-h-[90vh] min-h-[90vh]`}
      >
        <div className="fixed right-4 top-4 lg:block hidden">
          <ModeToggle />
        </div>
        <Card className="w-[90vw] lg:w-[400px] flex-row transition-all duration-300 ">
          <CardTitle className="flex text-4xl pt-10 items-center justify-center">
            SimpleFinance
          </CardTitle>
          <CardDescription className="pt-4 text-center">
            Seu login foi realizado com sucesso.
          </CardDescription>
          <Separator className="mt-10" />
          <CardContent className="flex justify-center items-center text-center">
            <Button
              onClick={goDashboard}
              className="mt-8 w-full transition duration-300 ease-in-out"
            >
              Ir para Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isVerified = await verifyToken(ctx)

  if (!isVerified) {
    console.log("Falha na verificação do token.")

    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  console.log("Token verificado com sucesso.")
  return { props: {} }
}

export default SuccessLogin
