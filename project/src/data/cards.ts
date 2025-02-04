interface Card {
  name: string;
  suit: 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
  value: string;
  description: string;
  theme: string;
  visualElements: string[];
  colorScheme: string[];
}

export const cards: Card[] = [
  // Hearts
  {
    name: "Ace of Hearts",
    suit: "Hearts",
    value: "Ace",
    description: "A radiant heart-shaped crystal floating in a cosmic void, pulsing with pure white light. Energy streams flow outward, connecting to smaller hearts in an intricate network of love and unity.",
    theme: "Pure Love and New Beginnings",
    visualElements: ["Crystal Heart", "Energy Streams", "Cosmic Background"],
    colorScheme: ["Pure White", "Rose Gold", "Deep Crimson"]
  },
  {
    name: "King of Hearts",
    suit: "Hearts",
    value: "King",
    description: "A wise monarch seated on a throne of intertwined roses, holding a heart-shaped scepter. His crown features delicate heart-shaped rubies that glow with inner warmth.",
    theme: "Emotional Wisdom and Leadership",
    visualElements: ["Rose Throne", "Heart Scepter", "Ruby Crown"],
    colorScheme: ["Royal Purple", "Deep Red", "Gold"]
  },
  // Continue with all 52 cards...
  {
    name: "Two of Spades",
    suit: "Spades",
    value: "2",
    description: "Two crossed spades emerging from shadows, their edges gleaming with moonlight. Dark vines with thorns wrap around the handles, suggesting hidden challenges.",
    theme: "Duality and Decisions",
    visualElements: ["Crossed Spades", "Thorned Vines", "Moonlight"],
    colorScheme: ["Midnight Blue", "Silver", "Shadow Black"]
  }
];

// Add all 52 cards following the same pattern