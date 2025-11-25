"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
  User, 
  Shield, 
  Smartphone, 
  CreditCard, 
  Mail, 
  Key, 
  Laptop, 
  Calendar,
  History,
  Eye,
  EyeOff,
  LogOut,
  Activity,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react"

import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Badge } from "@/shared/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { currentUser, userDevices, userSubscriptions } from "@/entities/user/lib/mock-data"
import { balanceHistory } from "@/entities/user/lib/balance-history-mock"
import { cn } from "@/shared/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useDepositStore } from "@/features/checkout/model/deposit-store"
import { DepositModal } from "@/features/checkout/ui/deposit-modal"

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showEmail, setShowEmail] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [balanceHistoryOpen, setBalanceHistoryOpen] = useState(false)
  
  const { openDeposit } = useDepositStore()

  return (
    <div className="min-h-screen pb-20">
      <DepositModal />
      
      {/* Header Section with Gradient Mesh Background */}
      <div className="relative bg-background border-b border-white/5 pb-8 pt-10 overflow-hidden">
         <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
         </div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center shadow-xl shadow-black/50 relative group overflow-hidden"
                >
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   <User className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                   <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-green-500 border-2 border-black shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </motion.div>
                
                <div className="space-y-1">
                   <motion.h1 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl font-bold tracking-tight"
                   >
                      {currentUser.username}
                   </motion.h1>
                   <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 text-muted-foreground"
                   >
                      <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full text-xs font-medium border border-white/5">
                        <Shield className="w-3 h-3" />
                        {currentUser.status}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-sm">На сайте с 2023 года</span>
                   </motion.div>
                </div>
              </div>

              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
              >
                  
              </motion.div>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
               <nav className="space-y-1">
                  {[
                     { id: "overview", label: "Информация", icon: Activity },
                     { id: "security", label: "Безопасность", icon: Shield },
                     { id: "devices", label: "Устройства", icon: Smartphone },
                     { id: "subscriptions", label: "Подписки", icon: CreditCard },
                  ].map((item) => (
                     <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                           "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group",
                           activeTab === item.id 
                              ? "bg-primary/10 text-primary" 
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                     >
                        {activeTab === item.id && (
                           <motion.div 
                              layoutId="sidebar-active"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                           />
                        )}
                        <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        {item.label}
                     </button>
                  ))}
               </nav>

               <div className="pt-8 border-t border-white/5">
                  <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-3 px-4 py-6">
                     <LogOut className="w-5 h-5" />
                     Выйти
                  </Button>
               </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
                className="space-y-6"
              >
                {activeTab === "overview" && (
                  <div className="grid gap-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="bg-black/20 border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
                        <CardHeader>
                           <CardTitle className="text-lg font-medium">Данные профиля</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Эл. Почта</Label>
                              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                                 <Mail className="w-4 h-4 text-muted-foreground" />
                                 <span className="flex-1 font-mono text-sm truncate">
                                    {showEmail ? currentUser.email : currentUser.email.replace(/(.{2})(.*)(@.*)/, "$1••••••••$3")}
                                 </span>
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-white/10"
                                    onClick={() => setShowEmail(!showEmail)}
                                 >
                                    {showEmail ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                 </Button>
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Имя пользователя</Label>
                              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5">
                                 <User className="w-4 h-4 text-muted-foreground" />
                                 <span className="font-medium text-sm">{currentUser.username}</span>
                              </div>
                           </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-primary/5 via-black/20 to-black/20 border-primary/20 backdrop-blur-sm">
                        <CardHeader>
                           <CardTitle className="text-lg font-medium flex items-center gap-2">
                              <CreditCard className="w-5 h-5 text-primary" />
                              Финансы
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="space-y-1">
                              <span className="text-3xl font-bold">{currentUser.balance.toFixed(2)} €</span>
                              <p className="text-sm text-muted-foreground">Доступный баланс</p>
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              <Button onClick={openDeposit} className="w-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">Пополнить</Button>
                              <Dialog open={balanceHistoryOpen} onOpenChange={setBalanceHistoryOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">История</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-xl bg-background/95 backdrop-blur-xl border-white/10">
                                  <DialogHeader>
                                    <DialogTitle>История операций</DialogTitle>
                                    <DialogDescription>Последние транзакции и изменения баланса</DialogDescription>
                                  </DialogHeader>
                                  <ScrollArea className="h-[400px] pr-4">
                                    <div className="space-y-4">
                                      {balanceHistory.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                                          <div className="flex items-center gap-4">
                                            <div className={cn(
                                              "w-10 h-10 rounded-full flex items-center justify-center",
                                              item.type === 'deposit' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                            )}>
                                              {item.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                            </div>
                                            <div>
                                              <p className="font-medium text-sm">{item.description}</p>
                                              <p className="text-xs text-muted-foreground">{item.date}</p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <p className={cn(
                                              "font-bold",
                                              item.amount > 0 ? "text-green-500" : "text-foreground"
                                            )}>
                                              {item.amount > 0 ? "+" : ""}{item.amount.toFixed(2)} €
                                            </p>
                                            <Badge variant="secondary" className={cn(
                                              "text-[10px] h-5",
                                              item.status === 'completed' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                                            )}>
                                              {item.status}
                                            </Badge>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                           </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <Card className="bg-black/20 border-white/10 backdrop-blur-sm max-w-2xl">
                     <CardHeader>
                        <CardTitle>Безопасность аккаунта</CardTitle>
                        <CardDescription>Обновите пароль и настройки безопасности</CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <Label>Текущий пароль</Label>
                              <div className="relative">
                                 <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                 <Input 
                                    type={showOldPassword ? "text" : "password"} 
                                    className="pl-10 pr-10 bg-white/5 border-white/10 focus:bg-white/10" 
                                    placeholder="••••••••" 
                                 />
                                 <button 
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                 >
                                    {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                 </button>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <Label>Новый пароль</Label>
                                 <div className="relative">
                                    <Input 
                                       type={showNewPassword ? "text" : "password"} 
                                       className="bg-white/5 border-white/10 focus:bg-white/10 pr-10" 
                                    />
                                    <button 
                                       type="button"
                                       onClick={() => setShowNewPassword(!showNewPassword)}
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                       {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <Label>Подтвердите пароль</Label>
                                 <div className="relative">
                                    <Input 
                                       type={showConfirmPassword ? "text" : "password"} 
                                       className="bg-white/5 border-white/10 focus:bg-white/10 pr-10" 
                                    />
                                    <button 
                                       type="button"
                                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                       {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="pt-2 flex justify-end">
                           <Button>Сохранить изменения</Button>
                        </div>
                     </CardContent>
                  </Card>
                )}

                {activeTab === "devices" && (
                   <div>
                      <h3 className="text-lg font-bold mb-6">Ваши устройства</h3>
                      <div className="grid gap-3">
                        {userDevices.map((device) => (
                          <motion.div 
                            key={device.id}
                            layout
                            className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/80 border border-white/5 hover:border-white/10 transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                                <Laptop className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{device.name}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {device.createdAt}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-400 hover:bg-green-500/10">
                              <ArrowDownLeft className="w-5 h-5" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                   </div>
                )}

                {activeTab === "subscriptions" && (
                   <div className="grid gap-4">
                      {userSubscriptions.map((sub, i) => (
                         <motion.div 
                           key={sub.id}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.1 }}
                           className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                         >
                           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                           
                           <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                              <div className="space-y-2">
                                 <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold">{sub.name}</h3>
                                    <Badge 
                                       variant={sub.status === 'active' ? 'default' : 'destructive'}
                                       className={cn(
                                          "capitalize",
                                          sub.status === 'active' ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                       )}
                                    >
                                       {sub.status === 'active' ? 'Активна' : 'Истекла'}
                                    </Badge>
                                 </div>
                                 <p className="text-sm text-muted-foreground">{sub.type}</p>
                                 
                                 <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                                    <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                       <Calendar className="w-3.5 h-3.5" />
                                       Активирована: {sub.activatedAt}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                       <History className="w-3.5 h-3.5" />
                                       {sub.duration}
                                    </span>
                                 </div>
                              </div>

                              <div className="flex items-center gap-3">
                                 <Dialog>
                                   <DialogTrigger asChild>
                                      <Button variant="outline" className="border-white/10 hover:bg-white/5">Подробнее</Button>
                                   </DialogTrigger>
                                   <DialogContent className="bg-background/95 backdrop-blur-xl border-white/10">
                                      <DialogHeader>
                                        <DialogTitle>{sub.name}</DialogTitle>
                                        <DialogDescription>Детальная информация о подписке</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 pt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="p-3 rounded-lg bg-white/5">
                                            <p className="text-xs text-muted-foreground mb-1">Тип</p>
                                            <p className="font-medium">{sub.type}</p>
                                          </div>
                                          <div className="p-3 rounded-lg bg-white/5">
                                            <p className="text-xs text-muted-foreground mb-1">Статус</p>
                                            <Badge variant="secondary" className={sub.status === 'active' ? 'text-green-500' : 'text-red-500'}>{sub.status}</Badge>
                                          </div>
                                          <div className="p-3 rounded-lg bg-white/5">
                                            <p className="text-xs text-muted-foreground mb-1">Активирована</p>
                                            <p className="font-medium">{sub.activatedAt}</p>
                                          </div>
                                          <div className="p-3 rounded-lg bg-white/5">
                                            <p className="text-xs text-muted-foreground mb-1">Длительность</p>
                                            <p className="font-medium">{sub.duration}</p>
                                          </div>
                                        </div>
                                        {sub.status === 'active' && (
                                            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                              <h4 className="font-bold text-primary mb-2">Ключ лицензии</h4>
                                              <code className="block p-2 bg-black/30 rounded font-mono text-sm select-all">
                                                XXXX-YYYY-ZZZZ-AAAA
                                              </code>
                                            </div>
                                        )}
                                      </div>
                                   </DialogContent>
                                 </Dialog>
                                 
                                 {sub.status === 'active' ? (
                                    <Button className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent shadow-none">Продлить</Button>
                                 ) : (
                                    <Button>Возобновить</Button>
                                 )}
                              </div>
                           </div>
                         </motion.div>
                      ))}
                   </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
