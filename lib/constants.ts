import { Category, Product } from '../types';

export const STORE_CONFIG = {
  name: 'Urban Slice',
  shortName: 'US',
  tagline: 'Artisanal Woodfire Pizzas • Handcrafted Fresh',
  freeDeliveryText: 'Free Home Delivery Across Town',
  phone1: '7300760917',
  phone2: '9056351220',
  whatsappNumber: '917300760917',
  currencySymbol: '₹',
  address: 'Shop No. 12, Main Market, Urban Slice Kitchen',
};

export const FALLBACK_CATEGORIES: Category[] = [
  { id: 'pizza', name: 'Pizzas', desc: 'Choose your pizza size', order: 1 },
  { id: 'sides', name: 'Sides', desc: 'Delicious side order', order: 2 },
  { id: 'beverages', name: 'Shakes & Mojito', desc: 'Cold drinks & refreshments', order: 3 },
  { id: 'burgers', name: 'Burger & Sandwich', desc: 'Quick bites', order: 4 },
  { id: 'value', name: 'Value Menu', desc: 'Pizza Mania & meals', order: 5 },
];

export const FALLBACK_PRODUCTS: Product[] = [
  /* PIZZAS */
  { id: 'sv1', cat: 'pizza', section: 'Simply Veg', name: 'Just Cheese Magreta Pizza', desc: 'Mozzarella cheese & sweet corn', sizes: { Small: 110, Medium: 240, Large: 340 } },
  { id: 'sv2', cat: 'pizza', section: 'Simply Veg', name: 'Cheese and Corn', desc: 'Mozzarella cheese & sweet corn', sizes: { Small: 110, Medium: 240, Large: 340 } },
  { id: 'sv3', cat: 'pizza', section: 'Simply Veg', name: 'Classic Veg', desc: 'Tandoori sauce, onion, sweet corn', sizes: { Small: 110, Medium: 240, Large: 340 } },
  { id: 'sv4', cat: 'pizza', section: 'Simply Veg', name: 'Mushroom Special', desc: 'Makhni sauce, mushroom, onion', sizes: { Small: 110, Medium: 240, Large: 340 } },

  { id: 'bc1', cat: 'pizza', section: 'Basic Concepts', name: 'Double Cheese Margherite', desc: 'Loaded with delicious extra cheese', sizes: { Small: 169, Medium: 339, Large: 439 } },
  { id: 'bc2', cat: 'pizza', section: 'Basic Concepts', name: 'Tandoori Paneer', desc: 'Paneer, capsicum, red paprika, tandoori sauce', sizes: { Small: 169, Medium: 339, Large: 439 } },
  { id: 'bc3', cat: 'pizza', section: 'Basic Concepts', name: 'Kadhai Paneer', desc: 'Paneer, capsicum, onion, spicy kadhai special masala', sizes: { Small: 169, Medium: 339, Large: 439 } },
  { id: 'bc4', cat: 'pizza', section: 'Basic Concepts', name: 'Country Hit', desc: 'Onion, capsicum, tomato', sizes: { Small: 169, Medium: 339, Large: 439 } },
  { id: 'bc5', cat: 'pizza', section: 'Basic Concepts', name: 'Salsa Veg', desc: 'Black olives, red paprika, jalapeno', sizes: { Small: 169, Medium: 339, Large: 439 } },
  { id: 'bc6', cat: 'pizza', section: 'Basic Concepts', name: 'Supreme Veg', desc: 'Sweet corn, black olive, mushroom', sizes: { Small: 169, Medium: 339, Large: 439 } },

  { id: 'fv1', cat: 'pizza', section: 'Feast Veg', name: '5 Cheese Pizza', desc: 'Five types of cheese', sizes: { Small: 179, Medium: 349, Large: 470 } },
  { id: 'fv2', cat: 'pizza', section: 'Feast Veg', name: 'Mexican Green Wave', desc: 'Onion, capsicum, tomato, jalapeno sprinkles with Mexican herb', sizes: { Small: 179, Medium: 349, Large: 470 } },
  { id: 'fv3', cat: 'pizza', section: 'Feast Veg', name: 'Makhni Paneer Pizza', desc: 'Makhni sauce, paneer, onion, capsicum, red paprika', sizes: { Small: 179, Medium: 349, Large: 470 } },
  { id: 'fv4', cat: 'pizza', section: 'Feast Veg', name: 'Mexican Paneer Pizza', desc: 'Mexican herbs, paneer, jalapeno, red paprika', sizes: { Small: 179, Medium: 349, Large: 470 } },
  { id: 'fv5', cat: 'pizza', section: 'Feast Veg', name: 'Farmer Choice', desc: 'Onion, capsicum, tomato, mushroom', sizes: { Small: 179, Medium: 349, Large: 470 } },
  { id: 'fv6', cat: 'pizza', section: 'Feast Veg', name: 'Veg Spicy', desc: 'Onion, capsicum, red paprika, sweet corn', sizes: { Small: 179, Medium: 349, Large: 470 } },
  { id: 'fv7', cat: 'pizza', section: 'Feast Veg', name: 'Jalapeno Bites', desc: 'Jalapeno, sweet corn & red paprika', sizes: { Small: 179, Medium: 349, Large: 470 } },

  { id: 'ex1', cat: 'pizza', section: 'Exotic Pizza', name: 'Achari-E-Panner', desc: 'Panner, red paper, onion, corn & achari souce', sizes: { Small: 199, Medium: 399, Large: 499 } },
  { id: 'ex2', cat: 'pizza', section: 'Exotic Pizza', name: 'Urban Tandoori', desc: 'Capsicum, jalapino, onion, corn, olive & tandoori souce', sizes: { Small: 199, Medium: 399, Large: 499 } },
  { id: 'ex3', cat: 'pizza', section: 'Exotic Pizza', name: 'Sweet and Spicy', desc: 'Jalepeno, mushroom, red paprika, tomato, sweet corn', sizes: { Small: 199, Medium: 399, Large: 499 } },
  { id: 'ex4', cat: 'pizza', section: 'Exotic Pizza', name: 'Deluxe Veg', desc: 'Onion, capsicum, mushroom, sweet corn, paneer', sizes: { Small: 199, Medium: 399, Large: 499 } },
  { id: 'ex5', cat: 'pizza', section: 'Exotic Pizza', name: 'All Rounder Pizza', desc: 'All veg with extra cheese and Mexican seasoning', sizes: { Small: 199, Medium: 399, Large: 499 } },
  { id: 'ex6', cat: 'pizza', section: 'Exotic Pizza', name: 'Italian Juicy', desc: 'Fresh onion, crisp capsicum, fresh tomato, mushroom, paneer, black olive, extra cheese', sizes: { Small: 199, Medium: 399, Large: 499 } },
  { id: 'ex7', cat: 'pizza', section: 'Exotic Pizza', name: 'Holic Zone', desc: 'Black olives, onion, jalepeno, capsicum, mushroom, tomato, red paper, paneer & extra cheese', sizes: { Small: 199, Medium: 399, Large: 499 } },

  /* SIDES */
  { id: 'cal1', cat: 'sides', section: 'Calzones', name: 'Cheese Calzone', desc: 'Crispy pocket filled with hot melted cheese', price: 85 },
  { id: 'cal2', cat: 'sides', section: 'Calzones', name: 'Spice Calzone', desc: 'Spicy filling baked in fresh dough', price: 95 },
  { id: 'cal3', cat: 'sides', section: 'Calzones', name: 'Mix Calzone', desc: 'Stuffed with fresh veggies & premium cheese', price: 110 },
  { id: 'gar1', cat: 'sides', section: 'Garlic Bread', name: 'Stuff Garlic Bread', desc: 'Garlic bread baked with herb garlic butter & mozzarella', price: 95 },
  { id: 'gar2', cat: 'sides', section: 'Garlic Bread', name: 'Jalapeno Garlic Bread', desc: 'Tangy jalapenos and melted cheese garlic bread', price: 100 },
  { id: 'gar3', cat: 'sides', section: 'Garlic Bread', name: 'Mix Paneer Garlic', desc: 'Stuffed with seasoned paneer & cheese', price: 150 },
  { id: 'taco1', cat: 'sides', section: "Taco's", name: 'Mexican Taco', desc: 'Crispy shell loaded with Mexican veg filling', price: 89 },
  { id: 'taco2', cat: 'sides', section: "Taco's", name: 'Paneer Taco', desc: 'Loaded taco with spicy paneer & creamy dressing', price: 99 },
  { id: 'pas1', cat: 'sides', section: 'Pasta', name: 'White Pasta', desc: 'Creamy Alfredo white sauce pasta', price: 89 },
  { id: 'pas2', cat: 'sides', section: 'Pasta', name: 'Red Pasta', desc: 'Tangy Italian marinara red sauce pasta', price: 89 },
  { id: 'pas3', cat: 'sides', section: 'Pasta', name: 'Mix Sauce Pasta', desc: 'Pink sauce pasta with rich cheese & herbs', price: 120 },
  { id: 'wr1', cat: 'sides', section: 'Wrap', name: 'Maxican Spice Wrap', desc: 'Tortilla wrap filled with zesty veggies & sauces', price: 90 },
  { id: 'wr2', cat: 'sides', section: 'Wrap', name: 'Paneer Wrap', desc: 'Tender spiced paneer cubes wrapped in toasted flatbread', price: 99 },
  { id: 'sal1', cat: 'sides', section: "Salad's Healthy", name: 'Veggie Salad', desc: 'Fresh crunchy vegetables with herb dressing', price: 99 },
  { id: 'sal2', cat: 'sides', section: "Salad's Healthy", name: 'Paneer Salad', desc: 'Protein-packed salad with paneer cubes and veggies', price: 110 },
  { id: 'sal3', cat: 'sides', section: "Salad's Healthy", name: 'Maxican Parcel', desc: 'Crispy parcel with Mexican spices', price: 110 },
  { id: 'sal4', cat: 'sides', section: "Salad's Healthy", name: 'Paneer Parcel', desc: 'Flaky baked crust loaded with cottage cheese', price: 150 },
  { id: 'fr1', cat: 'sides', section: 'Fries', name: 'Classic Fries', desc: 'Golden salted French fries', price: 79 },
  { id: 'fr2', cat: 'sides', section: 'Fries', name: 'More Cheese Fries', desc: 'French fries smothered with hot melted cheese sauce', price: 99 },
  { id: 'fr3', cat: 'sides', section: 'Fries', name: 'Peri Peri Fries', desc: 'Tossed in fiery peri-peri seasoning', price: 99 },
  { id: 'fr4', cat: 'sides', section: 'Fries', name: 'Tandoori Fries', desc: 'Crispy fries drizzled with aromatic tandoori sauce', price: 99 },

  /* BURGERS & SANDWICHES */
  { id: 'bu1', cat: 'burgers', section: 'Burger', name: 'Aloo Tikki Burger', desc: 'Crispy potato patty with fresh mayo & lettuce', price: 39 },
  { id: 'bu2', cat: 'burgers', section: 'Burger', name: 'Cheese Burger', desc: 'Juicy patty layered with a slice of rich cheese', price: 49 },
  { id: 'bu3', cat: 'burgers', section: 'Burger', name: 'Tandoori Burger', desc: 'Smoky tandoori sauce with crunchy patty', price: 59 },
  { id: 'bu4', cat: 'burgers', section: 'Burger', name: 'Paneer Burger', desc: 'Spiced paneer steak patty with special sauce', price: 69 },
  { id: 'bu5', cat: 'burgers', section: 'Burger', name: 'Jumbo Burger', desc: 'Double patty stacked with double sauces', price: 79 },
  { id: 'bu6', cat: 'burgers', section: 'Burger', name: 'Maharaja Burger', desc: 'The grand burger with loaded fillings & extra cheese', price: 89 },
  { id: 'sa1', cat: 'burgers', section: 'Sandwiches', name: 'Grilled Sandwich', desc: 'Toasted golden sandwich with seasoned veggies', price: 59 },
  { id: 'sa2', cat: 'burgers', section: 'Sandwiches', name: 'Sweet Corn Sandwich', desc: 'Buttery corn with molten cheese & herbs', price: 69 },
  { id: 'sa3', cat: 'burgers', section: 'Sandwiches', name: 'Paneer Tikka Sandwich', desc: 'Grilled sandwich stuffed with roasted paneer tikka', price: 79 },
  { id: 'sa4', cat: 'burgers', section: 'Sandwiches', name: 'Tandoori Sandwich', desc: 'Rich tandoori blend inside crisp grilled bread', price: 89 },
  { id: 'sa5', cat: 'burgers', section: 'Sandwiches', name: 'Special Sandwich', desc: "Chef's signature loaded cheese sandwich", price: 99 },

  /* BEVERAGES & SHAKES */
  { id: 'sh1', cat: 'beverages', section: 'Shakes', name: 'Cold Coffee', desc: 'Rich brewed chilled coffee with thick milk foam', price: 59 },
  { id: 'sh2', cat: 'beverages', section: 'Shakes', name: 'Strawberry Shakes', desc: 'Sweet strawberry milkshake topped with syrup', price: 69 },
  { id: 'sh3', cat: 'beverages', section: 'Shakes', name: 'Vanila Shakes', desc: 'Classic French vanilla ice cream shake', price: 69 },
  { id: 'sh4', cat: 'beverages', section: 'Shakes', name: 'Oreo Shakes', desc: 'Crushed Oreo cookies blended with chocolate cream', price: 69 },
  { id: 'sh5', cat: 'beverages', section: 'Shakes', name: 'Chocolate Shakes', desc: 'Decadent chocolate milkshake', price: 79 },
  { id: 'sh6', cat: 'beverages', section: 'Shakes', name: 'Butter Scotch Shakes', desc: 'Crunchy butterscotch bits and caramel sauce', price: 79 },
  { id: 'mo1', cat: 'beverages', section: 'Ma-Jito', name: 'Nimbo Pani', desc: 'Refreshing traditional Indian spiced lemonade', price: 59 },
  { id: 'mo2', cat: 'beverages', section: 'Ma-Jito', name: 'Mint Mojito', desc: 'Crushed mint, fresh lime and fizzy soda', price: 79 },
  { id: 'mo3', cat: 'beverages', section: 'Ma-Jito', name: 'Lemon Masala Mojito', desc: 'Tangy chatpata lemon cooler', price: 79 },
  { id: 'mo4', cat: 'beverages', section: 'Ma-Jito', name: 'Blue Angel Mojito', desc: 'Tropical blue curacao cooler with mint', price: 79 },
  { id: 'mo5', cat: 'beverages', section: 'Ma-Jito', name: 'Virgin Mojito', desc: 'Classic sparkling mint lime refresher', price: 79 },
  { id: 'mo6', cat: 'beverages', section: 'Ma-Jito', name: 'Green Apple Mojito', desc: 'Crisp green apple flavour with bubbly soda', price: 79 },

  /* VALUE MENU */
  { id: 'vm1', cat: 'value', section: 'Pizza Mania', name: 'Single Combo', desc: 'Single personal pizza combo', price: 250 },
  { id: 'vm2', cat: 'value', section: 'Pizza Mania', name: 'Tomato', desc: 'Juicy tomato toppings on mozzarella', price: 59 },
  { id: 'vm3', cat: 'value', section: 'Pizza Mania', name: 'Onion', desc: 'Crisp diced onions with gooey cheese', price: 69 },
  { id: 'vm4', cat: 'value', section: 'Pizza Mania', name: 'Capsicum', desc: 'Fresh green capsicum with cheese blend', price: 69 },
  { id: 'vm5', cat: 'value', section: 'Pizza Mania', name: 'Sweet Corn', desc: 'Golden sweet corn with melting mozzarella', price: 69 },
  { id: 'vm6', cat: 'value', section: 'Pizza Mania', name: 'Double Combo', desc: 'Double topping combo value pack', price: 380 },
  { id: 'vm7', cat: 'value', section: 'Pizza Mania', name: 'Onion + Paneer', desc: 'Crisp onion and seasoned paneer cubes', price: 99 },
  { id: 'vm8', cat: 'value', section: 'Pizza Mania', name: 'Onion + Capsicum', desc: 'Crunchy onion and fresh green bell pepper', price: 99 },
  { id: 'vm9', cat: 'value', section: 'Pizza Mania', name: 'Tomato + Sweet Corn', desc: 'Juicy tomato slices and sweet corn kernels', price: 99 },
  { id: 'vm10', cat: 'value', section: 'Pizza Mania', name: 'Red Paprika + Sweet Corn', desc: 'Spicy red paprika and juicy sweet corn', price: 99 },

  /* MEALS & COMBOS */
  { id: 'deal1', cat: 'value', section: 'Pizza Mania Meal', name: 'Pizza Mania Double + One Burger + Coke', desc: 'Complete meal combo with burger & drink', price: 160 },
  { id: 'deal2', cat: 'value', section: 'Pizza Mania Meal', name: 'Pizza Mania Double + One Calzone + Coke', desc: 'Value combo with double mania pizza, calzone & beverage', price: 209 },
  { id: 'deal3', cat: 'value', section: 'Pizza Mania Meal', name: 'Any Two Double + Any One Side Order + Coke', desc: 'Two double pizzas, side order of choice & beverage', price: 299 },
  { id: 'deal4', cat: 'value', section: 'Amazing Deals', name: 'Taco + Pasta + Wrap + Coke 300ml', desc: 'Amazing deal: taco, red/white pasta, wrap & Coke', price: 269 },
  { id: 'deal5', cat: 'value', section: 'Amazing Deals', name: 'Garlic + Fries + Taco + Coke 500ml', desc: 'Stuffed garlic bread, fries, taco & Coke 500ml', price: 289 },
  { id: 'deal6', cat: 'value', section: 'Family Meal', name: 'Any One Medium Pizza + Garlic + Pasta + Coke', desc: 'Medium pizza of choice, garlic bread, pasta & Coke', price: 599 },

  /* DIPS & DESSERT */
  { id: 'dip1', cat: 'sides', section: 'Dip', name: 'Spicy Dip', desc: 'Fiery garlic chili dipping sauce', price: 25 },
  { id: 'dip2', cat: 'sides', section: 'Dip', name: 'Cheese Dip', desc: 'Smooth melted cheese dipping cup', price: 25 },
  { id: 'dip3', cat: 'sides', section: 'Dip', name: 'Peri Peri Dip', desc: 'Zesty peri peri dipping sauce', price: 25 },
  { id: 'dess1', cat: 'sides', section: 'Dessert', name: 'Chocolava', desc: 'Warm molten chocolate cake with gooey center', price: 59 },
];
