import { Product } from "@/entities/product/model/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Reach Looper",
    description: "Увеличивает дальность взаимодействия с атакой. Позволяет доставать противников с невозможных для обычного игрока дистанций, оставаясь при этом незамеченным для античит-систем.",
    price: "2.00 €",
    pricing: {
        basePrice: 2.00,
        maxPrice: 150.00,
        overrides: {
            30: 35.00,
        }
    },
    iconName: "ReachIcon",
    tag: "TOP",
    tagColor: "bg-white text-black",
    images: [
        "https://placehold.co/600x400/18181b/FFF.png?text=Preview+1",
        "https://placehold.co/600x400/18181b/FFF.png?text=Preview+2",
        "https://placehold.co/600x400/18181b/FFF.png?text=Preview+3"
    ],
    features: [
        {
            title: "Легитность",
            description: "Специальные алгоритмы делают удары неотличимыми от обычных.",
            icon: "Ghost"
        },
        {
            title: "Настройка",
            description: "Гибкая настройка дистанции и угла обзора (FOV).",
            icon: "Settings"
        }
    ],
    highlights: [
        "Обход популярных античитов",
        "Настройка под любой пинг",
        "Минимальное влияние на FPS"
    ]
  },
  {
    id: 2,
    name: "Auto Clicker",
    description: "Умная автоматизация кликов с максимальным cps. Идеальное решение для PvP и фарма, обеспечивающее стабильный высокий CPS без дрожания прицела.",
    price: "1.00 €",
    pricing: {
        basePrice: 1.00,
        overrides: {
             1: 1.50
        }
    },
    iconName: "AutoClickerIcon",
    tag: "PRO",
    tagColor: "bg-zinc-800 text-zinc-300 border-zinc-700",
    images: [
        "https://placehold.co/600x400/18181b/FFF.png?text=Clicker+Preview"
    ],
    features: [
        {
            title: "Быстродействие",
            description: "Мгновенная реакция и максимальная оптимизация кода.",
            icon: "Zap"
        }
    ],
    highlights: [
        "Полная автоматизация процессов"
    ]
  },
  {
    id: 3,
    name: "Quanta",
    description: "Манипуляция физикой отбрасывания для получения преимущества в PvP. Контролируйте, как вы и ваши противники реагируете на удары.",
    price: "2.00 €",
    pricing: {
        basePrice: 2.00,
    },
    iconName: "QuantaIcon",
    tag: "NEW",
    tagColor: "bg-primary text-black",
    images: [],
    features: [
        {
            title: "Velocity Control",
            description: "Полный контроль над вертикальным и горизонтальным отбрасыванием.",
            icon: "Move"
        }
    ],
    highlights: [
        "Невидимость для проверок",
        "Работает на большинстве серверов",
        "Мгновенная активация"
    ]
  },
];
