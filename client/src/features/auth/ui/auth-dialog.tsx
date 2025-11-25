"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"

import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useAuth } from "@/features/auth/model/auth-provider"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email("Некорректный email адрес"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
})

const registerSchema = z.object({
  email: z.string().email("Некорректный email адрес"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

const forgotPasswordSchema = z.object({
  email: z.string().email("Некорректный email адрес"),
})

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type AuthView = "login" | "register" | "forgot-password"

const formContainerVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.05
    }
  },
  exit: { 
    opacity: 0, 
    x: 10, 
    transition: { duration: 0.15 } 
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 }
  }
}

const errorVariants: Variants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: { opacity: 1, height: "auto", marginTop: 4 },
  exit: { opacity: 0, height: 0, marginTop: 0 }
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState<AuthView>("login")
  const { login, register } = useAuth()
  const router = useRouter()

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setView("login")
        setShowPassword(false)
        loginForm.reset()
        registerForm.reset()
        forgotPasswordForm.reset()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open, loginForm, registerForm, forgotPasswordForm])

  async function onLogin(data: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    try {
      const success = await login(data)
      if (success) {
        onOpenChange(false)
        router.push("/profile")
      }
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onRegister(data: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    try {
      await register(data)
      onOpenChange(false)
    } catch (error) {
      console.error("Register failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function onForgotPassword() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setView("login")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-6 overflow-hidden border-white/5 bg-black/60 backdrop-blur-2xl shadow-2xl !duration-300 data-[state=open]:!zoom-in-95 data-[state=open]:!slide-in-from-bottom-2">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        <DialogHeader className="relative z-10 space-y-2">
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <div className="relative h-8 w-full">
              <AnimatePresence mode="popLayout">
                {view === "login" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.2 }}
                    key="title-login"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    С возвращением
                  </motion.span>
                )}
                {view === "register" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.2 }}
                    key="title-register"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    Создание аккаунта
                  </motion.span>
                )}
                {view === "forgot-password" && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.2 }}
                    key="title-forgot"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    Восстановление
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground h-5 overflow-hidden relative">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={view}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {view === "login" && "Введите свои данные для входа"}
                {view === "register" && "Заполните форму для регистрации"}
                {view === "forgot-password" && "Мы отправим ссылку для сброса"}
              </motion.span>
            </AnimatePresence>
          </DialogDescription>
        </DialogHeader>

        <div className="relative z-10 mt-6">
          <AnimatePresence mode="wait" initial={false}>
            {view !== "forgot-password" ? (
              <motion.div
                key="auth-tabs-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Tabs value={view} onValueChange={(v: string) => setView(v as AuthView)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 p-1 rounded-xl border border-white/5">
                    <TabsTrigger 
                        value="login" 
                        className="rounded-lg transition-all duration-300 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-md"
                    >
                        Вход
                    </TabsTrigger>
                    <TabsTrigger 
                        value="register" 
                        className="rounded-lg transition-all duration-300 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-md"
                    >
                        Регистрация
                    </TabsTrigger>
                  </TabsList>
                  
                  <AnimatePresence mode="wait">
                    {view === "login" ? (
                      <motion.form
                        key="login-form"
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onSubmit={loginForm.handleSubmit(onLogin)}
                        className="space-y-4"
                      >
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative group">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-within:text-primary" />
                              <Input
                                id="email"
                                placeholder="name@example.com"
                                {...loginForm.register("email")}
                                className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-200 focus:ring-2 ring-primary/20 h-11"
                              />
                          </div>
                          <AnimatePresence>
                            {loginForm.formState.errors.email && (
                              <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="text-xs text-red-400">
                                {loginForm.formState.errors.email.message}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Пароль</Label>
                            <Button 
                                variant="link" 
                                className="p-0 h-auto text-xs text-muted-foreground hover:text-primary transition-colors" 
                                type="button"
                                onClick={() => setView("forgot-password")}
                            >
                              Забыли пароль?
                            </Button>
                          </div>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-within:text-primary" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              {...loginForm.register("password")}
                              className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-200 focus:ring-2 ring-primary/20 pr-10 h-11"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <motion.div
                                initial={false}
                                animate={{ rotate: showPassword ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </motion.div>
                            </Button>
                          </div>
                          <AnimatePresence>
                            {loginForm.formState.errors.password && (
                              <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="text-xs text-red-400">
                                {loginForm.formState.errors.password.message}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button 
                                type="submit" 
                                className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all duration-200 h-11 text-base" 
                                disabled={isLoading}
                              >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Войти"}
                              </Button>
                            </motion.div>
                        </motion.div>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="register-form"
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onSubmit={registerForm.handleSubmit(onRegister)}
                        className="space-y-4"
                      >
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <div className="relative group">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-within:text-primary" />
                              <Input
                                  id="register-email"
                                  placeholder="name@example.com"
                                  {...registerForm.register("email")}
                                  className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-200 focus:ring-2 ring-primary/20 h-11"
                              />
                          </div>
                          <AnimatePresence>
                            {registerForm.formState.errors.email && (
                              <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="text-xs text-red-400">
                                {registerForm.formState.errors.email.message}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="register-password">Пароль</Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-within:text-primary" />
                            <Input
                              id="register-password"
                              type={showPassword ? "text" : "password"}
                              {...registerForm.register("password")}
                              className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-200 focus:ring-2 ring-primary/20 pr-10 h-11"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <motion.div
                                initial={false}
                                animate={{ rotate: showPassword ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </motion.div>
                            </Button>
                          </div>
                          <AnimatePresence>
                            {registerForm.formState.errors.password && (
                              <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="text-xs text-red-400">
                                {registerForm.formState.errors.password.message}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="confirm-password">Подтверждение</Label>
                          <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-within:text-primary" />
                            <Input
                                id="confirm-password"
                                type={showPassword ? "text" : "password"}
                                {...registerForm.register("confirmPassword")}
                                className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-all duration-200 focus:ring-2 ring-primary/20 h-11"
                            />
                          </div>
                          <AnimatePresence>
                            {registerForm.formState.errors.confirmPassword && (
                              <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="text-xs text-red-400">
                                {registerForm.formState.errors.confirmPassword.message}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button 
                                type="submit" 
                                className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all duration-200 h-11 text-base" 
                                disabled={isLoading}
                              >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Создать аккаунт"}
                              </Button>
                            </motion.div>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                key="forgot-password"
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4"
              >
                <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-4">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                        id="forgot-email"
                        placeholder="name@example.com"
                        {...forgotPasswordForm.register("email")}
                        className="bg-background/50 border-white/10 focus:bg-background transition-all duration-200 focus:ring-2 ring-primary/20"
                    />
                    <AnimatePresence>
                      {forgotPasswordForm.formState.errors.email && (
                        <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit" className="text-xs text-red-400">
                          {forgotPasswordForm.formState.errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit" 
                          className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all duration-200" 
                          disabled={isLoading}
                        >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Сбросить пароль
                        </Button>
                      </motion.div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="text-center">
                      <Button 
                          variant="link" 
                          className="text-sm text-muted-foreground hover:text-primary group" 
                          type="button"
                          onClick={() => setView("login")}
                      >
                          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                          Вернуться ко входу
                      </Button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
