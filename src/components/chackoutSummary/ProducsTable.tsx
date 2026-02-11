import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartstore";
import { api } from "@/lib/axios";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export function ProductsTables() {
    const { items, updateQuantity, removeItem  } = useCartStore();

  async function handleIncrease(productId: string, currentQty: number) {
    updateQuantity(productId, currentQty + 1);
    await api.post("/api/cart/update", {
      productId,
      quantity: currentQty + 1,
    });
  }

  async function handleDecrease(productId: string, currentQty: number) {
    updateQuantity(productId, currentQty - 1);
    await api.post("/api/cart/update", {
      productId,
      quantity: currentQty - 1,
    });
  }

  async function handleRemove(productId: string) {
    removeItem(productId);
    await api.delete(`/api/cart/remove/${productId}`);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="px-6 py-4 text-xs font-medium uppercase">
                Produto
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-medium uppercase">
                Preço
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-xs font-medium uppercase">
                Quantidade
              </TableHead>
              <TableHead className="px-6 py-4 text-right text-xs font-medium uppercase">
                Subtotal
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
            <AnimatePresence>
              {items.map((item) => (
                <motion.tr
                  key={item.productId}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.imageUrl}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="font-medium">
                         {item.product.name}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    Kz {item.product.price.toFixed(2)}
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        onClick={() =>
                          handleDecrease(item.productId, item.quantity)
                        }
                        className="flex h-8 w-8 items-center justify-center"
                      >
                        -
                      </Button>

                      <Input
                        readOnly
                        value={item.quantity}
                        className="w-12 text-center"
                      />

                      <Button
                        onClick={() =>
                          handleIncrease(item.productId, item.quantity)
                        }
                        className="flex h-8 w-8 items-center justify-center"
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right font-medium">
                    Kz {(item.product.price * item.quantity).toFixed(2)}
                  </TableCell>

                  <TableCell className="px-6 py-4 text-right">
                    <Button
                      onClick={() => handleRemove(item.productId)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}