import { GasProduct } from "@/types";
import { CartItem } from "@/types";

export const mockGasProducts: GasProduct[] = [
  {
    id: "1",
    name: "Botijão de Gás P13 - Ultragaz",
    description: "Botijão de gás residencial P13",
    weight: "13kg",
    price: 110,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVUnN3P8v-5o2Mq2iCdX72p5UV14w1EStcDhilQHQg9q-14dPhNF3WsY8zMBB5hWu0Ls63kg1bYfXGtzTXfXgdc6M7obnJCaU5ff474LfpnQtjjyFWlQdPZNyDGZgqbjrjib8pp81qXyyLSylEl1NmfXdYLbrhlm3COWo_6fvfhvuXxDo16oPUdfwDb-tvh1m1WF6ZVvAeCn4DYYqpAWYxzAjsOFqsTBbC9lrDy3KttBFXOLpyUM8DRDl-FQ7Bz2ofQAIJCKsUuOU",
    stock: 50,
    brand: "Ultragaz",
    category: "gas",
    rating: 4.7,
    reviewCount: 120,
  },
  {
    id: "2",
    name: "Botijão de Gás P45 - Consigaz",
    description: "Botijão de gás industrial P45",
    weight: "45kg",
    price: 450,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCyGiNuNx0L6wS5LtsfURaDg1QzXd0VJYY34pHUuObnr7zkxMy-rwaM3bZpCvD-Qsi9hbYvsTodJZI-rXuBnyYJAYwHliR1ElQ9gBdh2zQ66kyYyjI7Eu6lGrgFyUEyrYin1lfThEzA2izXZfxJ-XSFcuCkPnjumCUFkSEN4kEJ6V4FHGmKFrsxm19E1WGv6EO1USKp8qoQ_2H-vowRCaHBD3tvslH2rcEeznX4zZFD6yk6qfVqyRSVkS6bi_JDS3owM8jE1iHNhL8",
    stock: 20,
    brand: "Consigaz",
    category: "gas",
    rating: 4.9,
    reviewCount: 89,
  },
];



export const mockCartItems: CartItem[] = mockGasProducts.map((product) => ({
  productId: product.id,
  product,
  quantity: 1,
}));