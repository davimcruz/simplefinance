import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Inter } from "next/font/google"
import "../../app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/toggle"
import { verifyToken } from "../api/jwtAuth"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetServerSideProps } from "next"

const inter = Inter({ subsets: ["latin"] })

const DashboardPage = () => {
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [newName, setNewName] = useState("")
  const [newLastName, setNewLastName] = useState("")
    const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })

    router.push("/auth/signin")
  }

  useEffect(() => {
    const emailFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="))
      ?.split("=")[1]

    if (!emailFromCookie) {
      throw new Error("Email não encontrado nos cookies")
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/query?email=${emailFromCookie}`)
        if (!response.ok) {
          throw new Error("Erro ao obter dados do usuário")
        }
        const userData = await response.json()
        setName(userData.nome)
        setLastName(userData.sobrenome)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  const handleSave = async () => {
    try {
      setLoading(true)
      const emailFromCookieEncoded = document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        ?.split("=")[1]

      if (!emailFromCookieEncoded) {
        throw new Error("Email não encontrado nos cookies")
      }

      const emailFromCookie = decodeURIComponent(emailFromCookieEncoded)

      const requestBody = {
        email: emailFromCookie,
        nome: newName,
        sobrenome: newLastName,
      }

      const response = await fetch("/api/updateName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar nome e sobrenome")
      } else {
        router.push("/dashboard")
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Erro durante o salvamento:", error)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className={`${inter.className} flex min-h-screen w-full flex-col`}>
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Products
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Customers
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Suporte</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
          <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Configurações</h1>
          </div>
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav
              className="grid gap-4 text-sm text-muted-foreground"
              x-chunk="dashboard-04-chunk-0"
            >
              <Link href="#" className="font-semibold text-primary">
                Geral
              </Link>
              <Link href="#">Integrações</Link>
              <Link href="#">Suporte</Link>
              <Link href="#">Sair</Link>
            </nav>
            <div className="grid gap-6">
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Editar Nome</CardTitle>
                  <CardDescription>
                    Utilize esse espaço para editar seu nome cadastrado na
                    plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <Input
                      className="mb-4"
                      placeholder="Nome"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <Input
                      placeholder="Sobrenome"
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                    />
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                  </Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-04-chunk-2">
                <CardHeader>
                  <CardTitle>Plugins Directory</CardTitle>
                  <CardDescription>
                    The directory within your project, in which your plugins are
                    located.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-4">
                    <Input
                      placeholder="Project Name"
                      defaultValue="/content/plugins"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include" defaultChecked />
                      <label
                        htmlFor="include"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Allow administrators to change the directory.
                      </label>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
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

export default DashboardPage
function jwt_decode(tokenString: string): any {
  throw new Error("Function not implemented.")
}