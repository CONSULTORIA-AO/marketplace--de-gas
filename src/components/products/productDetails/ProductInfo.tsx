import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/store/cartstore';
import { GasProduct } from '@/types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  product: GasProduct;
}

export function ProductInfo({ product }: Props) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-white rounded-2xl p-6 border-border-soft border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-900 shadow-xl">
          <div
            className="w-full bg-center bg-no-repeat bg-contain aspect-[4/3] rounded-xl"
            data-alt="Large image"
            style={{
              backgroundImage: `url(${product.imageUrl})`,
            }}
          ></div>
        </div>
        <div className="grid grid-cols-4 gap-4 ">
          <div className="aspect-square rounded-xl border-2 border-[#137fec] overflow-hidden cursor-pointer border-border-light dark:border-border-dark dark:border-slate-800 shadow-xl">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${product.imageUrl})`,
              }}
            ></div>
          </div>
          <div className="aspect-square rounded-xl border-border-soft overflow-hidden cursor-pointer hover:border-[#137fec]/50 transition-colors border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${product.imageUrl})`,
              }}
            ></div>
          </div>
          <div className="aspect-square rounded-xl border-border-soft overflow-hidden cursor-pointer hover:border-[#137fec]/50 transition-colors border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${product.imageUrl})`,
              }}
            ></div>
          </div>
          <div className="aspect-square rounded-xl border-border-soft overflow-hidden cursor-pointer hover:border-[#137fec]/50 transition-color border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-800 shadow-xl">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${product.imageUrl})`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-extrabold text-text-[#137fec] leading-tight mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="flex text-secondary-action">
                <span className="material-symbols-outlined fill text-xl">
                  star
                </span>
                <span className="material-symbols-outlined fill text-xl">
                  star
                </span>
                <span className="material-symbols-outlined fill text-xl">
                  star
                </span>
                <span className="material-symbols-outlined fill text-xl">
                  star
                </span>
                <span className="material-symbols-outlined text-xl">
                  star_half
                </span>
              </div>
              <span className="text-sm font-bold text-text-[#137fec]">
                {product.rating}
              </span>
              <span className="text-sm text-text-secondary">
                ({product.reviewCount} avaliações)
              </span>
            </div>
            <span className="text-border-soft">|</span>
            <p className="text-sm font-medium">
              Vendido por{' '}
              <Link className="text-[#137fec] hover:underline font-bold" to="#">
                Gás do Bairro
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-10 shadow-xl shadow-gray-200/50 border-border-soft space-y-8 border-border-light dark:border-border-dark border border-slate-100 dark:border-slate-900">
          <div className="space-y-1 ">
            <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider">
              Preço Atual
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-text-[#137fec]">
                KZ {product.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold mt-2">
              <span className="material-symbols-outlined text-xl">
                check_circle
              </span>
              <span className="text-sm uppercase">
                Em estoque e pronto para entrega
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <Label
              className="text-sm font-bold text-text-[#137fec] block"
              htmlFor="quantity"
            >
              Quantidade
            </Label>
            <div className="flex items-center">
              <select
                className="form-select w-full rounded-xl border-border-soft bg-gray-50 focus:ring-[#137fec] focus:border-[#137fec] h-14 text-lg font-medium"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((q) => (
                  <option key={q} value={q}>
                    {q} Unidade{q > 1 && 's'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                addItem(product, quantity);
                navigate('/checkout');
              }}
              className="flex w-full items-center justify-center rounded-xl h-16 px-8 bg-[#137fec] text-white text-lg font-extrabold shadow-lg shadow-secondary-action/25 hover:bg-[#137fec]/90 transition-all"
            >
              <span>COMPRAR AGORA</span>
            </Button>
            <Button
              onClick={() => {
                addItem(product, quantity);
              }}
              className="flex w-full items-center justify-center rounded-xl h-16 px-8 bg-green-700  hover:bg-green-600 text-white text-lg font-extrabold shadow-lg shadow-[#137fec]/25 hover:scale-[1.02] transition-all"
            >
              <span>ADICIONAR AO CARRINHO</span>
            </Button>
          </div>
          <div className="pt-6 border-t border-border-soft">
            <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl">
              <span className="material-symbols-outlined text-[#137fec] text-2xl">
                local_shipping
              </span>
              <div>
                <p className="font-bold text-sm text-[#137fec]">
                  Entrega ultra-rápida
                </p>
                <p className="text-sm text-text-secondary">
                  Chega em sua casa entre <strong>30-45 minutos</strong> após o
                  pedido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
