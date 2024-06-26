import { GetServerSideProps } from "next"

import { Inter } from "next/font/google"

import "../../app/globals.css"

import { ThemeProvider } from "@/components/theme/theme-provider"
import { verifyToken } from "../api/Auth/jwtAuth"

import Header from "@/components/dashboard/header/header"
import TransactionsFull from "@/components/transactions/transactions-full"

const inter = Inter({ subsets: ["latin"] })

const Transactions = () => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className={`${inter.className} flex min-h-screen w-full flex-col`}>
        <Header />
        <TransactionsFull />
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

export default Transactions
