"use client";

import { useState } from "react";
import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "Как активировать подписку?",
    answer: "После покупки подписки, перейдите в личный кабинет и выберите устройство для активации. Скачайте лаунчер и войдите в свой аккаунт."
  },
  {
    question: "Можно ли перенести подписку на другое устройство?",
    answer: "Да, вы можете сбросить привязку устройства один раз в 7 дней через личный кабинет в разделе 'Устройства'."
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Мы принимаем оплату криптовалютой и банковскими картами через безопасные платёжные системы."
  },
  {
    question: "Что делать если возникли проблемы?",
    answer: "Свяжитесь с нашей поддержкой через Telegram или Discord. Мы отвечаем в течение 24 часов."
  },
  {
    question: "Есть ли пробный период?",
    answer: "Мы предлагаем подписки от 1 дня, чтобы вы могли протестировать продукт перед покупкой на длительный срок."
  },
  {
    question: "Безопасно ли использовать ваши продукты?",
    answer: "Наши продукты разработаны с учётом безопасности и регулярно обновляются. Мы используем современные методы защиты."
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen">
      <PageBackground />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h1>
            <p className="text-muted-foreground">
              Ответы на популярные вопросы о наших продуктах и услугах
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform shrink-0",
                      openIndex === idx && "rotate-180"
                    )} 
                  />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
