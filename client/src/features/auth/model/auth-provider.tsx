"use client"

import React, { createContext, useContext, useState } from "react"
import { UserProfile } from "@/entities/user/model/types"
import { currentUser as mockUser } from "@/entities/user/lib/mock-data"

interface LoginData {
  email: string;
  password?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: UserProfile | null
  login: (data: LoginData) => Promise<boolean>
  logout: () => void
  register: (data: LoginData) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)

  const login = async (data: LoginData) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        if (data.email === "test@example.com" && data.password === "testtest") {
          setUser({
            ...mockUser,
            email: data.email,
            username: "TestUser"
          })
          resolve(true)
        } else {
          setUser(mockUser)
          resolve(true)
        }
      }, 1000)
    })
  }

  const register = async () => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        setUser(mockUser)
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
