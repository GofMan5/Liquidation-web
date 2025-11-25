export interface UserProfile {
  username: string
  email: string
  balance: number
  status: 'REGULAR' | 'PREMIUM' | 'VIP'
  avatar?: string
}

// Устройства пользователя (для лаунчера)
export interface UserDevice {
  id: string
  name: string // CPU name или название устройства
  createdAt: string
}

export interface UserSubscription {
  id: string
  name: string
  type: string
  status: 'active' | 'expired' | 'cancelled'
  activatedAt: string
  expiresAt?: string
  duration: string
  deviceId?: string
}

