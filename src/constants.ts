import { Product } from "./types";

export const ARTIST_BIO = {
  name: "Nyia",
  intro:
    "Sou Nyia, artista digital. Depois de uma vida dedicada à fotografia infantil — onde captei sorrisos, gestos espontâneos e a pureza dos instantes — encontrei um novo caminho criativo: a arte digital abstrata.",
  story:
    "Hoje, crio a partir da liberdade, da maturidade e do silêncio fértil onde a imaginação floresce. A minha arte é geométrica, emocional e intuitiva. Não uso figuras humanas; escolho comunicar através da luz, da sombra, da cor e da vibração das formas. Cada obra é um diálogo interior, uma energia que se revela em camadas, uma expressão que não precisa de palavras.",
  philosophy:
    "Aqui encontrarás peças únicas, criadas com intenção e sensibilidade — obras que transformam espaços e despertam emoções. Também posso criar arte personalizada, pensada para refletir a tua energia, o teu ambiente ou o teu propósito. Este é o meu mundo. A minha verdade. A minha arte.",
  invite: "Sou Nyia. E convido-te a descobrir o que a imagem pode sentir.",
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Fluxo Interior",
    price: 120,
    imageUrl: "/src/img/1.png",
    description:
      "Cada camada é uma respiração, cada curva uma memória, cada cor uma emoção que se libertou.",
    category: "Abstrato",
  },
  {
    id: "2",
    title: "Essência Rosa",
    price: 150,
    imageUrl: "/src/img/2.png",
    description:
      "Uma explosão de tons quentes que emana luz e suavidade para qualquer ambiente.",
    category: "Energético",
  },
  {
    id: "3",
    title: "Vórtice de Cores",
    price: 95,
    imageUrl: "/src/img/3.png",
    description:
      "Ondas vibrantes que celebram a alegria e a complexidade da vida digital.",
    category: "Abstrato",
  },
  {
    id: "4",
    title: "Centro Silencioso",
    price: 180,
    imageUrl: "/src/img/4.png",
    description:
      "As formas fluem com leveza, como se dançassem num espaço onde o tempo abranda.",
    category: "Geométrico",
  },
  {
    id: "5",
    title: "Explosão Interior",
    price: 110,
    imageUrl: "/src/img/5.png",
    description:
      "O vermelho vibra como força, o amarelo abre caminhos, o azul acalma.",
    category: "Energético",
  },
  {
    id: "6",
    title: "Imaginação Profunda",
    price: 135,
    imageUrl: "/src/img/6.png",
    description:
      "É como se cada forma, cada cor, cada movimento me revelasse algo que estava escondido dentro de mim.",
    category: "Abstrato",
  },
];

export const STUDIO_DESC =
  "O meu ateliê é um espaço de escuta e presença. Localizado num recanto onde a luz natural dança com as ferramentas digitais, é aqui que o invisível ganha forma. Cada pixel é trabalhado com a mesma intenção de uma pincelada física, num processo ritualista e sem pressa.";

export const CONTACT_INFO = {
  address: "Rua das Artes, n.º 12, 1200-000 Lisboa, Portugal",
  email: "nyia.art@exemplo.pt",
  phone: "+351 912 345 678",
  instagram: "@nyia.art",
};
