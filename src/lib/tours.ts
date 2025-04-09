export interface Tour {
  id: string;
  name: string;
  photo: string;
  location: string;
  rating: number;
  price: number;
  description?: string;
}

// Renamed from popularTours to reflect new section title
export const whatToDoTours: Tour[] = [
  {
    id: "1",
    name: "Salto de Paraquedas em Boituva",
    photo:
      "https://images.unsplash.com/photo-1521673252667-e05da380b252?w=600&q=80",
    location: "Boituva, SP",
    rating: 4.98,
    price: 890,
    description:
      "Experimente a adrenalina de um salto duplo com instrutores certificados.",
  },
  {
    id: "2",
    name: "Aula de Surf em Ubatuba",
    photo:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80",
    location: "Ubatuba, SP",
    rating: 4.85,
    price: 150,
    description:
      "Aprenda a surfar nas melhores praias do litoral norte paulista.",
  },
  {
    id: "3",
    name: "Voo de Asa Delta em São Conrado",
    photo:
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&q=80",
    location: "Rio de Janeiro, RJ",
    rating: 4.92,
    price: 450,
    description:
      "Voe sobre as praias mais bonitas do Rio de Janeiro com instrutores experientes.",
  },
  {
    id: "4",
    name: "Trilha na Pedra do Baú",
    photo:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    location: "São Bento do Sapucaí, SP",
    rating: 4.9,
    price: 120,
    description:
      "Trilha guiada até o topo da Pedra do Baú com vistas panorâmicas.",
  },
  {
    id: "5",
    name: "Visitação a Fazenda Histórica",
    photo:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    location: "Campinas, SP",
    rating: 4.87,
    price: 85,
    description:
      "Conheça uma autêntica fazenda de café do século XIX com degustação.",
  },
  {
    id: "6",
    name: "Produção de Azeite com Almoço",
    photo:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    location: "Maria da Fé, MG",
    rating: 4.95,
    price: 180,
    description:
      "Visite um olival, aprenda sobre a produção de azeite e desfrute de um almoço típico.",
  },
];

export const adventureTours: Tour[] = [
  {
    id: "7",
    name: "Passeio Histórico em Campos do Jordão",
    photo:
      "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=80",
    location: "Campos do Jordão, SP",
    rating: 4.89,
    price: 95,
    description:
      "Conheça os principais pontos históricos e arquitetônicos da cidade.",
  },
  {
    id: "8",
    name: "Rafting no Rio Paraíba",
    photo:
      "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=600&q=80",
    location: "São Luiz do Paraitinga, SP",
    rating: 4.93,
    price: 160,
    description:
      "Desça as corredeiras do Rio Paraíba com equipamentos profissionais.",
  },
  {
    id: "9",
    name: "Observação de Aves na Mata Atlântica",
    photo:
      "https://images.unsplash.com/photo-1621494547431-5eabcbfaa2f0?w=600&q=80",
    location: "Ubatuba, SP",
    rating: 4.96,
    price: 110,
    description: "Observe dezenas de espécies de aves em seu habitat natural.",
  },
  {
    id: "10",
    name: "Passeio de Caiaque em Paraty",
    photo:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    location: "Paraty, RJ",
    rating: 4.91,
    price: 130,
    description:
      "Explore as águas cristalinas da baía de Paraty em um passeio de caiaque.",
  },
  {
    id: "11",
    name: "Tour de Bicicleta em Ilhabela",
    photo:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80",
    location: "Ilhabela, SP",
    rating: 4.88,
    price: 90,
    description:
      "Percorra as trilhas e praias de Ilhabela em um passeio guiado de bicicleta.",
  },
  {
    id: "12",
    name: "Escalada no Pico dos Marins",
    photo:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80",
    location: "Piquete, SP",
    rating: 4.94,
    price: 200,
    description:
      "Escalada guiada ao Pico dos Marins com equipamentos inclusos.",
  },
];
