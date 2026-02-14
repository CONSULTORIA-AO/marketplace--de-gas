import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ProductSpolier() {
  return (
    <div className="w-full">
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-4xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">
              Encontre o Gás Ideal para Você
            </p>
            <p className="text-base font-normal leading-normal text-slate-500 dark:text-slate-400">
              Exibindo 24 de 150 fornecedores
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Ordenar por:
          </span>
          <Button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#137fec]/20 pl-4 pr-3 text-[#137fec]">
            <p className="text-sm font-semibold">Melhor Classificado</p>
            <span className="material-symbols-outlined text-xl">
              expand_more
            </span>
          </Button>
          <Button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 pl-4 pr-3 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            <p className="text-sm font-medium">Menor Preço</p>
          </Button>
          <Button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 pl-4 pr-3 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            <p className="text-sm font-medium">Mais Relevante</p>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <div className="group flex flex-col overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-lg dark:bg-slate-900 shadow-xl">
          <Link to="/produto/:id">
            <div className="relative">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                data-alt="Botijão de gás azul da SuperGás"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB94YxhRMaztmJXaL8E_KxmpPzwiXbiFmt2eLXyYY1y2RgIei7zdK8m3Q5bzHEQDCJW8tI5Nw-kxR3A8ACsh6mxWn6kTcLRhjDF_ov7-m-BFoN0JjUAb9YyFLZ_iSLeLKON0bA3I_SSt2vA6VeAjczKFEOmFmboDjRzUV3zxBK6bvyBmsp333xvrRGsnHn0XSUW-_C9e0_uumO6Jdpxhu3aeRYEWF4tTzN0taRc1F7Co1sgzC49XFTKDQrKRsHgjvxVdSeRqCRseyQ");',
                }}
              ></div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-sm rating-star filled">
                  star
                </span>
                <span>4.8</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                SuperGás - GLP 13kg
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                125 avaliações
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-xl font-black text-slate-900 dark:text-white">
                R$ 95,00
              </p>
              <Button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                <span className="material-symbols-outlined text-base">
                  add_shopping_cart
                </span>
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-lg dark:bg-slate-900">
          <Link to="/produto/:id">
            <div className="relative">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                data-alt="Botijão de gás vermelho da Gás Rápido"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZ0k6wq6j_rPiTX6AF-_91M6R0X31LSjAp1j4GsXbpv_vLgfQd9PfbHCK_HtPmWfPQAFldbz41SYYMhhJnAGY3MuwHS-8fnzO4FqEEL44yLHfV6FOV4Ryalyn2TU8QG8E7K6M_rXYVPPweh9kcYYMVHYMqiJIHydJH03qQ7qEV4iJUNatCjNLi2fRG8pr4RpYybJaY6WhxvKjdpcB-DADCfmiYopbGx1RSPDMTLBhZRtYIELPOn1k6poiPHqJD1ylNDFNyoSq6kd0");',
                }}
              ></div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-sm rating-star filled">
                  star
                </span>
                <span>4.9</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Gás Rápido - GLP 13kg
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                210 avaliações
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-xl font-black text-slate-900 dark:text-white">
                R$ 92,50
              </p>
              <Button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                <span className="material-symbols-outlined text-base">
                  add_shopping_cart
                </span>
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-lg dark:bg-slate-900">
          <Link to="/produto/:id">
            <div className="relative">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                data-alt="Botijão de gás da Chama Azul"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHLVkp_lDAfdTcx4-si75j9noDrV6S2spiU_bS-60S1t1ExxCJtL-QCUy6Qe4RZa8CAr5KI1Y3WNmw1rU2UKcoh8K_H2Dsjt4w8fR0zFgnSOw1iMFlKXT6jkwpFNCsJgVo8-3uqLH_r41q-MX0RN7zbmacCawF12ItHETpU-2w75KPpUGKfm-Yz6Fbpkp5mAxDcRuPVEvSCKkSD3b3dpBi5FoSWx0qnwpWUbxSNz0U4Rkxv6FkBzYANKqNlzcOjmIVrbYesCR8PD8");',
                }}
              ></div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-sm rating-star filled">
                  star
                </span>
                <span>4.5</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Chama Azul - GLP 13kg
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                88 avaliações
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-xl font-black text-slate-900 dark:text-white">
                R$ 98,00
              </p>
              <Button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                <span className="material-symbols-outlined text-base">
                  add_shopping_cart
                </span>
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-lg dark:bg-slate-900">
          <Link to="/produto/:id">
            <div className="relative">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                data-alt="Instalação de gás natural"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnEIm0cUBvehUNpUFmPCrok-KcTNgp8doiGHOM3zMKGZhgf-wPm8Vp54itGyfFLjpSJtWtpehUa80hQEqQlRgIMuP-1cVqR2mdL204tK2XMvm-3aSSz8x7p4xUPVsEynfBC0EQHWqZV21GaIB0D_KeKUAKyCAbZlPLfoobbw21uZc0GFVDbYrn6mJe4qWCTHQh2HdjizXvZNuSu73Zf1fbd42dUJlbKAJGIJ77k5xRi9r_pHpZ6KtbZZ7A4F7ojgOAybrowQUMoPQ");',
                }}
              ></div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-sm rating-star filled">
                  star
                </span>
                <span>4.7</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Gás Express - Gás Natural
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                45 avaliações
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-xl font-black text-slate-900 dark:text-white">
                R$ 110,00
              </p>
              <Button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                <span className="material-symbols-outlined text-base">
                  visibility
                </span>
                Ver Detalhes
              </Button>
            </div>
          </div>
        </div>
        <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-lg dark:bg-slate-900">
          <Link to="/produto/:id">
            <div className="relative">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                data-alt="Botijão de gás branco da TopGás"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJetXR85XHHdZ4ryVmMeFGjfG-aQ0--idfSkVP4zcNVi1QoMESuyE-ZHjI8dlD8y1HWTmtfr8JPC0UE_LNJQlKtMMan1EG-rLvFqjQBy1rV4a_-hNRLpjVPi_P1I9tFn1kZu8UInNLQ272yQMtHj23lTrzGMC-0ZpY-MPLcZ-FVQXYAB_9Sd4k2UMF1leXS3BgPcTI372L4P_KT3A3KVyK_qWtXe446nJCNF3ARzg3_VcyiP7P9Tp_rqvkATk48mDgEQ8pBGSlB_Y");',
                }}
              ></div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-sm rating-star filled">
                  star
                </span>
                <span>4.6</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                TopGás - GLP 13kg
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                150 avaliações
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-xl font-black text-slate-900 dark:text-white">
                R$ 94,00
              </p>
              <Button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                <span className="material-symbols-outlined text-base">
                  add_shopping_cart
                </span>
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-shadow duration-300 hover:shadow-lg dark:bg-slate-900">
          <Link to="/produto/:id">
            <div className="relative">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                data-alt="Botijão industrial de gás de 45kg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBodMRYaHOd7azys9B4oFd82xpiMz_DrT1gChL-kfQHkVB4RhtpRHng89DzSGM_R9JiT_enAVwlBRwLhXko_qA8q6BTQKy3u0_tIPec1aNY-h4mAx8VNXrJ8YXAKQnCsR02IG5d7RNbsRR6qgF_NIPbtWIxjgs0xbNp44tt1smcsDv1jT03ljcTmeIysREolcsYWDBKQMjZ48DgWN76nWE7MwBLORgFAlLZI1rLZrwfCODZmyzjr3OJFoDUhk2gelSCb6InA6ZwABA");',
                }}
              ></div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-xs font-bold text-white">
                <span className="material-symbols-outlined text-sm rating-star filled">
                  star
                </span>
                <span>4.9</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Distribuidora Veloz - GLP 45kg
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                30 avaliações
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-xl font-black text-slate-900 dark:text-white">
                R$ 350,00
              </p>
              <Button className="flex h-9 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-4 text-sm font-bold text-white transition-opacity hover:opacity-90">
                <span className="material-symbols-outlined text-base">
                  add_shopping_cart
                </span>
                Adicionar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center p-4">
        <Link
          className="flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
          to="#"
        >
          <span className="material-symbols-outlined text-2xl">
            chevron_left
          </span>
        </Link>
        <Link
          className="text-sm font-bold flex size-10 items-center justify-center rounded-lg bg-[#137fec] text-white"
          to="#"
        >
          1
        </Link>
        <Link
          className="text-sm font-medium flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
          to="#"
        >
          2
        </Link>
        <Link
          className="text-sm font-medium flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
          to="#"
        >
          3
        </Link>
        <span className="text-sm font-medium flex size-10 items-center justify-center text-slate-500 dark:text-slate-400">
          ...
        </span>
        <Link
          className="text-sm font-medium flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
          to="#"
        >
          8
        </Link>
        <Link
          className="flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
          to="#"
        >
          <span className="material-symbols-outlined text-2xl">
            chevron_right
          </span>
        </Link>
      </div>
    </div>
  );
}