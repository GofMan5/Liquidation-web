import { Shield, RefreshCw, Sparkles, Layers } from "lucide-react";
import { FadeIn, StaggerContainer } from "@/shared/ui/animations";
import SpotlightCard from "@/shared/ui/spotlight-card";

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-24 relative z-20">
      <FadeIn>
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Почему выбирают нас?</h2>
          <p className="text-muted-foreground text-lg">Технологии, опережающие время и конкурентов.</p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn>
              <SpotlightCard 
                  spotlightColor="rgba(72,196,185,0.25)"
                  className="h-full p-8 flex flex-col bg-card/40 backdrop-blur-md border-border hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(72,196,185,0.1)]"
              >
                  <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/20 shadow-[0_0_15px_rgba(72,196,185,0.15)]">
                          <Sparkles className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="h-1.5 w-12 rounded-full bg-muted/50 overflow-hidden">
                          <div className="h-full w-full bg-primary animate-[progress_2s_ease-in-out_infinite]" />
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Премиум качество</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                      Оптимизация каждой строки кода для максимальной производительности и стабильности.
                  </p>
              </SpotlightCard>
          </FadeIn>

          <FadeIn>
                <SpotlightCard 
                  spotlightColor="rgba(59,130,246,0.25)"
                  className="h-full p-8 flex flex-col bg-card/40 backdrop-blur-md border-border hover:border-blue-500/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                >
                  <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                          <Shield className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <Shield className="w-5 h-5 text-blue-500/20" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-400 transition-colors">Приватность</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                      Шифрование данных и анонимизация на уровне ядра. Ваша безопасность — наш приоритет.
                  </p>
              </SpotlightCard>
          </FadeIn>

          <FadeIn>
              <SpotlightCard 
                  spotlightColor="rgba(168,85,247,0.25)"
                  className="h-full p-8 flex flex-col bg-card/40 backdrop-blur-md border-border hover:border-purple-500/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
              >
                  <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                          <RefreshCw className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-purple-400 transition-colors">Авто-обновления</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                      Мгновенная доставка фиксов и улучшений через нашу облачную систему доставки.
                  </p>
              </SpotlightCard>
          </FadeIn>
          
          <FadeIn>
                <SpotlightCard 
                  spotlightColor="rgba(16,185,129,0.25)"
                  className="h-full p-8 flex flex-col bg-card/40 backdrop-blur-md border-border hover:border-emerald-500/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                >
                  <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                          <Layers className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                      </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-emerald-400 transition-colors">Удобство</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                      Интуитивный UI/UX, позволяющий сосредоточиться на главном, а не на настройках.
                  </p>
              </SpotlightCard>
          </FadeIn>
      </StaggerContainer>
    </section>
  );
}
