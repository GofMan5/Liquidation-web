import { UserDevice, UserProfile, UserSubscription } from "@/entities/user/model/types"

export const currentUser: UserProfile = {
  username: "ExampleUser",
  email: "user@example.com",
  balance: 100.00,
  status: "REGULAR"
}

// Устройства пользователя (для лаунчера)
export const userDevices: UserDevice[] = [
  {
    id: "device-1",
    name: "Intel(R) Core(TM) i5-10400F CPU @ 2.90GHz",
    createdAt: "01.08.2025, 20:13:51"
  }
]

export const userSubscriptions: UserSubscription[] = [
  {
    id: "sub-1",
    name: "Reach Looper",
    type: "Premium",
    status: "active",
    activatedAt: "01.11.2024",
    duration: "30 дней",
    deviceId: "device-1"
  },
  {
    id: "sub-2",
    name: "Auto Clicker",
    type: "Standard",
    status: "expired",
    activatedAt: "01.09.2024",
    duration: "30 дней",
    deviceId: "device-1"
  }
]
