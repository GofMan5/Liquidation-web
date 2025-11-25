import { PageBackground } from "@/widgets/page-background/ui/page-background";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <PageBackground />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Политика конфиденциальности</h1>
              <p className="text-sm text-muted-foreground">Последнее обновление: Ноябрь 2025</p>
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-6">
            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">Какие данные мы собираем</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Мы собираем минимально необходимую информацию: email для авторизации, 
                данные об устройстве для привязки лицензии, историю покупок.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">Как мы используем данные</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Данные используются исключительно для предоставления услуг: авторизация, 
                активация подписок, техническая поддержка. Мы не продаём данные третьим лицам.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">Хранение данных</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Данные хранятся на защищённых серверах. Мы применяем современные методы шифрования 
                и регулярно обновляем системы безопасности.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">Ваши права</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Вы можете запросить удаление своих данных, связавшись с поддержкой. 
                После удаления аккаунта все данные будут безвозвратно удалены в течение 30 дней.
              </p>
            </section>

            <section className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
              <h2 className="text-lg font-bold mb-3">Cookies</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Мы используем cookies для сохранения сессии авторизации и настроек интерфейса. 
                Вы можете отключить cookies в настройках браузера.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
