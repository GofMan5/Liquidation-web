"use client";

import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { Button } from "@/shared/ui/button";
import { 
  MessageCircle, 
  Mail, 
  Clock, 
  ExternalLink,
  Headphones
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    name: "Telegram",
    description: "Быстрые ответы в чате",
    action: "Написать",
    href: "https://t.me/liquidation_support",
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    icon: MessageCircle,
    name: "Discord",
    description: "Сообщество и поддержка",
    action: "Присоединиться",
    href: "https://discord.gg/liquidation",
    color: "bg-indigo-500/10 text-indigo-400"
  },
  {
    icon: Mail,
    name: "Email",
    description: "Для официальных запросов",
    action: "Написать",
    href: "mailto:support@liquidation.dev",
    color: "bg-green-500/10 text-green-400"
  },
];

export default function SupportPage() {
  return (
    <div className="relative min-h-screen">
      <PageBackground />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Поддержка</h1>
            <p className="text-muted-foreground">
              Мы всегда готовы помочь. Выберите удобный способ связи.
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.name}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="gap-2 group-hover:bg-white/5">
                    {method.action}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              );
            })}
          </div>

          <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Время ответа</h3>
                <p className="text-sm text-muted-foreground">
                  Telegram и Discord — до 2 часов в рабочее время (10:00 - 22:00 MSK).
                  Email — до 24 часов.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
