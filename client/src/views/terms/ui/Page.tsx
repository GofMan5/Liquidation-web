import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <PageBackground />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Условия использования</h1>
              <p className="text-sm text-muted-foreground">Последнее обновление: Ноябрь 2025</p>
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-6">
            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">1. Общие положения</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Настоящие Условия использования регулируют отношения между пользователем и сервисом Liquidation. 
                Используя наш сервис, вы соглашаетесь с данными условиями.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">2. Использование сервиса</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Пользователь обязуется использовать сервис только в законных целях и не нарушать права третьих лиц. 
                Запрещается передача учётных данных третьим лицам.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">3. Оплата и возврат</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Все платежи являются окончательными. Возврат средств возможен только в случае технических проблем 
                на стороне сервиса, которые не были устранены в течение 48 часов.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">4. Ограничение ответственности</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Сервис предоставляется «как есть». Мы не несём ответственности за любые убытки, 
                связанные с использованием или невозможностью использования сервиса.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">5. Изменение условий</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Мы оставляем за собой право изменять данные условия в любое время. 
                Продолжение использования сервиса означает согласие с обновлёнными условиями.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
