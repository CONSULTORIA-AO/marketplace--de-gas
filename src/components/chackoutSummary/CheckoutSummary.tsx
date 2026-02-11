import { CartItem } from "@/types";

interface Props {
  item: CartItem;
}

export function CheckoutSummaryItem({ item }: Props) {
  return (
    <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
      <div className="w-16 h-16 flex-shrink-0 bg-accent-pastel rounded-lg p-2 flex items-center justify-center">
        <img
          alt={item.product.name}
          className="w-full h-full object-contain"
          src={item.product.imageUrl}
        />
      </div>

      <div className="flex-1">
        <p className="font-bold text-slate-800 text-sm">
          {item.product.name}
        </p>
        <p className="text-xs text-slate-500 font-medium">
          Quantidade: {item.quantity}
        </p>
      </div>

      <p className="font-bold text-slate-900 text-sm whitespace-nowrap">
        Kz {(item.product.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}