"use client";

import { Construction } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Construction className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">В разработке</h1>
        <p className="text-muted-foreground">Админ панель скоро будет доступна</p>
      </div>
    </div>
  );
}
