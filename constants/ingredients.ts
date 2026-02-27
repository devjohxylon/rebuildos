export interface PantryIngredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
  keywords: string[];
  excludes?: string[];
}

export const INGREDIENT_CATEGORIES = [
  "Basics",
  "Dairy & Eggs",
  "Sweeteners",
  "Spices & Extracts",
  "Chocolate & Chips",
  "Nuts & Dried Fruit",
  "Fresh Fruit",
  "Oils & Liquids",
  "Leavening & Thickeners",
  "Other",
] as const;

export const PANTRY_INGREDIENTS: PantryIngredient[] = [
  // Basics
  { id: "flour", name: "All-Purpose Flour", category: "Basics", emoji: "🌾", keywords: ["flour"], excludes: [] },
  { id: "cake_flour", name: "Cake Flour", category: "Basics", emoji: "🌾", keywords: ["cake flour"] },
  { id: "bread_flour", name: "Bread Flour", category: "Basics", emoji: "🌾", keywords: ["bread flour"] },
  { id: "salt", name: "Salt", category: "Basics", emoji: "🧂", keywords: ["salt"] },
  { id: "oats", name: "Oats", category: "Basics", emoji: "🥣", keywords: ["oats", "oatmeal"] },
  { id: "cornmeal", name: "Cornmeal", category: "Basics", emoji: "🌽", keywords: ["cornmeal"] },
  { id: "graham_crackers", name: "Graham Crackers", category: "Basics", emoji: "🍪", keywords: ["graham cracker", "graham crust"] },

  // Dairy & Eggs
  { id: "butter", name: "Butter", category: "Dairy & Eggs", emoji: "🧈", keywords: ["butter"], excludes: ["peanut butter", "buttermilk"] },
  { id: "eggs", name: "Eggs", category: "Dairy & Eggs", emoji: "🥚", keywords: ["egg"] },
  { id: "milk", name: "Milk", category: "Dairy & Eggs", emoji: "🥛", keywords: ["milk"], excludes: ["buttermilk", "coconut milk", "condensed milk", "evaporated milk"] },
  { id: "heavy_cream", name: "Heavy Cream", category: "Dairy & Eggs", emoji: "🥛", keywords: ["heavy cream", "whipping cream", "heavy whipping cream"] },
  { id: "buttermilk", name: "Buttermilk", category: "Dairy & Eggs", emoji: "🥛", keywords: ["buttermilk"] },
  { id: "cream_cheese", name: "Cream Cheese", category: "Dairy & Eggs", emoji: "🧀", keywords: ["cream cheese"] },
  { id: "sour_cream", name: "Sour Cream", category: "Dairy & Eggs", emoji: "🥛", keywords: ["sour cream"] },
  { id: "yogurt", name: "Yogurt", category: "Dairy & Eggs", emoji: "🥛", keywords: ["yogurt"] },
  { id: "condensed_milk", name: "Condensed Milk", category: "Dairy & Eggs", emoji: "🥫", keywords: ["condensed milk"] },
  { id: "evaporated_milk", name: "Evaporated Milk", category: "Dairy & Eggs", emoji: "🥫", keywords: ["evaporated milk"] },

  // Sweeteners
  { id: "sugar", name: "Granulated Sugar", category: "Sweeteners", emoji: "🍬", keywords: ["sugar", "granulated sugar"], excludes: ["brown sugar", "powdered sugar", "turbinado", "confectioner"] },
  { id: "brown_sugar", name: "Brown Sugar", category: "Sweeteners", emoji: "🍬", keywords: ["brown sugar"] },
  { id: "powdered_sugar", name: "Powdered Sugar", category: "Sweeteners", emoji: "🍬", keywords: ["powdered sugar", "confectioner"] },
  { id: "honey", name: "Honey", category: "Sweeteners", emoji: "🍯", keywords: ["honey"] },
  { id: "maple_syrup", name: "Maple Syrup", category: "Sweeteners", emoji: "🍁", keywords: ["maple syrup"] },
  { id: "molasses", name: "Molasses", category: "Sweeteners", emoji: "🫗", keywords: ["molasses"] },
  { id: "corn_syrup", name: "Corn Syrup", category: "Sweeteners", emoji: "🫗", keywords: ["corn syrup"] },
  { id: "caramel", name: "Caramel Sauce", category: "Sweeteners", emoji: "🍮", keywords: ["caramel"] },

  // Spices & Extracts
  { id: "vanilla", name: "Vanilla Extract", category: "Spices & Extracts", emoji: "🌿", keywords: ["vanilla"] },
  { id: "almond_extract", name: "Almond Extract", category: "Spices & Extracts", emoji: "🌿", keywords: ["almond extract"] },
  { id: "cinnamon", name: "Cinnamon", category: "Spices & Extracts", emoji: "🫚", keywords: ["cinnamon"] },
  { id: "nutmeg", name: "Nutmeg", category: "Spices & Extracts", emoji: "🫚", keywords: ["nutmeg"] },
  { id: "ginger", name: "Ground Ginger", category: "Spices & Extracts", emoji: "🫚", keywords: ["ginger"] },
  { id: "cloves", name: "Cloves", category: "Spices & Extracts", emoji: "🫚", keywords: ["cloves"] },
  { id: "cardamom", name: "Cardamom", category: "Spices & Extracts", emoji: "🫚", keywords: ["cardamom"] },
  { id: "pumpkin_spice", name: "Pumpkin Pie Spice", category: "Spices & Extracts", emoji: "🎃", keywords: ["pumpkin pie spice", "pumpkin spice"] },

  // Chocolate & Chips
  { id: "cocoa_powder", name: "Cocoa Powder", category: "Chocolate & Chips", emoji: "🍫", keywords: ["cocoa powder", "cocoa"] },
  { id: "chocolate_chips", name: "Chocolate Chips", category: "Chocolate & Chips", emoji: "🍫", keywords: ["chocolate chips"] },
  { id: "dark_chocolate", name: "Dark Chocolate", category: "Chocolate & Chips", emoji: "🍫", keywords: ["dark chocolate", "bittersweet chocolate", "semisweet chocolate", "semi-sweet chocolate"] },
  { id: "white_chocolate", name: "White Chocolate", category: "Chocolate & Chips", emoji: "🤍", keywords: ["white chocolate"] },
  { id: "matcha", name: "Matcha Powder", category: "Chocolate & Chips", emoji: "🍵", keywords: ["matcha"] },

  // Nuts & Dried Fruit
  { id: "walnuts", name: "Walnuts", category: "Nuts & Dried Fruit", emoji: "🥜", keywords: ["walnut"] },
  { id: "pecans", name: "Pecans", category: "Nuts & Dried Fruit", emoji: "🥜", keywords: ["pecan"] },
  { id: "almonds", name: "Almonds", category: "Nuts & Dried Fruit", emoji: "🥜", keywords: ["almond"], excludes: ["almond extract"] },
  { id: "coconut", name: "Shredded Coconut", category: "Nuts & Dried Fruit", emoji: "🥥", keywords: ["coconut"], excludes: ["coconut oil", "coconut milk"] },
  { id: "raisins", name: "Raisins", category: "Nuts & Dried Fruit", emoji: "🍇", keywords: ["raisin"] },
  { id: "dried_cranberries", name: "Dried Cranberries", category: "Nuts & Dried Fruit", emoji: "🫐", keywords: ["dried cranberr", "cranberr"], excludes: ["cranberry juice"] },
  { id: "poppy_seeds", name: "Poppy Seeds", category: "Nuts & Dried Fruit", emoji: "🌰", keywords: ["poppy seed"] },

  // Fresh Fruit
  { id: "strawberries", name: "Strawberries", category: "Fresh Fruit", emoji: "🍓", keywords: ["strawberr"] },
  { id: "blueberries", name: "Blueberries", category: "Fresh Fruit", emoji: "🫐", keywords: ["blueberr"] },
  { id: "raspberries", name: "Raspberries", category: "Fresh Fruit", emoji: "🫐", keywords: ["raspberr"] },
  { id: "bananas", name: "Bananas", category: "Fresh Fruit", emoji: "🍌", keywords: ["banana"] },
  { id: "apples", name: "Apples", category: "Fresh Fruit", emoji: "🍎", keywords: ["apple"], excludes: ["apple cider vinegar"] },
  { id: "lemons", name: "Lemons", category: "Fresh Fruit", emoji: "🍋", keywords: ["lemon"] },
  { id: "oranges", name: "Oranges", category: "Fresh Fruit", emoji: "🍊", keywords: ["orange"] },
  { id: "cherries", name: "Cherries", category: "Fresh Fruit", emoji: "🍒", keywords: ["cherr"] },
  { id: "pumpkin", name: "Pumpkin Puree", category: "Fresh Fruit", emoji: "🎃", keywords: ["pumpkin"] },
  { id: "zucchini", name: "Zucchini", category: "Fresh Fruit", emoji: "🥒", keywords: ["zucchini"] },
  { id: "carrots", name: "Carrots", category: "Fresh Fruit", emoji: "🥕", keywords: ["carrot"] },
  { id: "limes", name: "Limes", category: "Fresh Fruit", emoji: "🍋", keywords: ["lime"], excludes: ["key lime"] },

  // Oils & Liquids
  { id: "vegetable_oil", name: "Vegetable Oil", category: "Oils & Liquids", emoji: "🫗", keywords: ["vegetable oil"] },
  { id: "coconut_oil", name: "Coconut Oil", category: "Oils & Liquids", emoji: "🥥", keywords: ["coconut oil"] },
  { id: "olive_oil", name: "Olive Oil", category: "Oils & Liquids", emoji: "🫒", keywords: ["olive oil"] },
  { id: "apple_cider_vinegar", name: "Apple Cider Vinegar", category: "Oils & Liquids", emoji: "🍎", keywords: ["apple cider vinegar"] },
  { id: "white_vinegar", name: "White Vinegar", category: "Oils & Liquids", emoji: "🫗", keywords: ["white vinegar", "vinegar"], excludes: ["apple cider vinegar"] },
  { id: "coffee", name: "Coffee / Espresso", category: "Oils & Liquids", emoji: "☕", keywords: ["coffee", "espresso"] },
  { id: "food_coloring", name: "Food Coloring", category: "Oils & Liquids", emoji: "🎨", keywords: ["food coloring"] },

  // Leavening & Thickeners
  { id: "baking_powder", name: "Baking Powder", category: "Leavening & Thickeners", emoji: "🧪", keywords: ["baking powder"] },
  { id: "baking_soda", name: "Baking Soda", category: "Leavening & Thickeners", emoji: "🧪", keywords: ["baking soda"] },
  { id: "yeast", name: "Yeast", category: "Leavening & Thickeners", emoji: "🧪", keywords: ["yeast"] },
  { id: "cornstarch", name: "Cornstarch", category: "Leavening & Thickeners", emoji: "🧪", keywords: ["cornstarch"] },
  { id: "cream_of_tartar", name: "Cream of Tartar", category: "Leavening & Thickeners", emoji: "🧪", keywords: ["cream of tartar"] },
  { id: "gelatin", name: "Gelatin", category: "Leavening & Thickeners", emoji: "🧪", keywords: ["gelatin"] },

  // Other
  { id: "peanut_butter", name: "Peanut Butter", category: "Other", emoji: "🥜", keywords: ["peanut butter"] },
  { id: "jam", name: "Jam / Preserves", category: "Other", emoji: "🍓", keywords: ["jam", "preserves", "jelly"] },
  { id: "sprinkles", name: "Sprinkles", category: "Other", emoji: "🎉", keywords: ["sprinkle"] },
  { id: "frying_oil", name: "Oil for Frying", category: "Other", emoji: "🫗", keywords: ["oil for frying", "frying"] },
];

/**
 * Check if a recipe ingredient string matches a pantry ingredient
 */
export function ingredientMatchesPantry(
  recipeIngredient: string,
  pantryItem: PantryIngredient
): boolean {
  const lower = recipeIngredient.toLowerCase();
  const hasExclusion =
    pantryItem.excludes?.some((e) => lower.includes(e.toLowerCase())) ?? false;
  if (hasExclusion) return false;
  return pantryItem.keywords.some((k) => lower.includes(k.toLowerCase()));
}

/**
 * Find which pantry item matches a recipe ingredient string.
 * Returns the pantry item ID or null if no match.
 */
export function findMatchingPantryItem(
  recipeIngredient: string,
  pantryItemIds: string[]
): string | null {
  const activePantryItems = PANTRY_INGREDIENTS.filter((p) =>
    pantryItemIds.includes(p.id)
  );
  for (const item of activePantryItems) {
    if (ingredientMatchesPantry(recipeIngredient, item)) {
      return item.id;
    }
  }
  return null;
}

/**
 * Calculate how many ingredients in a recipe the user has in their pantry.
 * Returns { matched, total, missing[] }
 */
export function getRecipeMatch(
  recipeIngredients: string[],
  pantryItemIds: string[]
): { matched: number; total: number; missing: string[]; percentage: number } {
  const missing: string[] = [];
  let matched = 0;
  const total = recipeIngredients.length;

  for (const ingredient of recipeIngredients) {
    const match = findMatchingPantryItem(ingredient, pantryItemIds);
    if (match) {
      matched++;
    } else {
      missing.push(ingredient);
    }
  }

  return {
    matched,
    total,
    missing,
    percentage: total > 0 ? Math.round((matched / total) * 100) : 0,
  };
}
