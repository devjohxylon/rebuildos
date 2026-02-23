export interface Recipe {
  id: string;
  title: string;
  category: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  servings: number;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
}

export const CATEGORIES = [
  { id: "all", label: "All", emoji: "🧁" },
  { id: "cakes", label: "Cakes", emoji: "🎂" },
  { id: "cupcakes", label: "Cupcakes", emoji: "🧁" },
  { id: "cookies", label: "Cookies", emoji: "🍪" },
  { id: "brownies", label: "Brownies", emoji: "🍫" },
  { id: "muffins", label: "Muffins", emoji: "🧁" },
  { id: "pies", label: "Pies", emoji: "🥧" },
  { id: "tarts", label: "Tarts", emoji: "🍰" },
  { id: "cheesecakes", label: "Cheesecakes", emoji: "🍰" },
  { id: "bread", label: "Bread", emoji: "🍞" },
  { id: "donuts", label: "Donuts", emoji: "🍩" },
  { id: "pastries", label: "Pastries", emoji: "🥐" },
  { id: "scones", label: "Scones", emoji: "🫓" },
];
