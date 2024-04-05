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

import { ModeToggle } from "@/components/toggle"
import { ThemeProvider } from "@/components/theme-provider"

import "../../../app/globals.css"

const inter = Inter({ subsets: ["latin"] })

const goDashboard = () => {
  Router.push("/dashboard")
}

const SuccessLogin = () => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div
        className={`${inter.className} flex items-center justify-center min-h-screen`}
      >
        <div className="fixed right-4 top-4">
          <ModeToggle />
        </div>
        <Card className="w-[400px] flex-row transition-all duration-300 ">
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

export default SuccessLogin
