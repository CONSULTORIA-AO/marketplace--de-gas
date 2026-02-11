import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";

// Simulação de backend
const mockApi = {
  getAddresses: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: 1,
              street: "Rua das Flores, 123",
              district: "Centro",
              city: "São Paulo",
              state: "SP",
              zip: "01001-000",
              isDefault: true,
              mapUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE",
            },
            {
              id: 2,
              street: "Avenida Paulista, 1500",
              district: "Bela Vista",
              city: "São Paulo",
              state: "SP",
              zip: "01310-200",
              isDefault: false,
              mapUrl:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE",
            },
          ]),
        500
      )
    ),
  addAddress: (address) =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ ...address, id: Date.now() }), 500)
    ),
  removeAddress: (id) =>
    new Promise((resolve) => setTimeout(() => resolve(id), 500)),
  setDefault: (id) =>
    new Promise((resolve) => setTimeout(() => resolve(id), 500)),
  editAddress: (address) =>
    new Promise((resolve) => setTimeout(() => resolve(address), 500)),
};

export function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar endereços ao montar
  useEffect(() => {
    mockApi.getAddresses().then((data) => {
      setAddresses(data);
      setLoading(false);
    });
  }, []);

  // Adicionar novo endereço (simulação)
  const handleAdd = async () => {
    const novo = {
      street: "Novo Endereço",
      district: "Bairro",
      city: "Cidade",
      state: "UF",
      zip: "00000-000",
      isDefault: false,
      mapUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE",
    };
    setLoading(true);
    const res = await mockApi.addAddress(novo);
    setAddresses((prev) => [...prev, res]);
    setLoading(false);
  };

  // Remover endereço
  const handleRemove = async (id) => {
    setLoading(true);
    await mockApi.removeAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setLoading(false);
  };

  // Definir como padrão
  const handleSetDefault = async (id) => {
    setLoading(true);
    await mockApi.setDefault(id);
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    setLoading(false);
  };

  // Editar endereço (simulação simples)
  const handleEdit = async (id) => {
    setLoading(true);
    const novoNome = prompt("Novo nome da rua:");
    if (novoNome) {
      const updated = addresses.map((a) =>
        a.id === id ? { ...a, street: novoNome } : a
      );
      await mockApi.editAddress(updated.find((a) => a.id === id));
      setAddresses(updated);
    }
    setLoading(false);
  };

  return (
    <main className="font-display bg-background-light dark:bg-background-dark text-text-light-primary dark:text-dark-primary">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight">
                  Meus Endereços
                </h1>
                <p className="text-base font-normal text-text-light-secondary dark:text-dark-secondary">
                  Gerencie seus endereços para entrega.
                </p>
              </div>
              <Button
                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
                onClick={handleAdd}
                disabled={loading}
              >
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">Adicionar Novo Endereço</span>
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="text-center py-8">Carregando...</div>
              ) : addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-card-light dark:bg-card-dark p-8 text-center mt-4">
                  <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-500">
                    location_off
                  </span>
                  <h3 className="text-lg font-bold">
                    Nenhum endereço cadastrado
                  </h3>
                  <p className="max-w-xs text-sm text-text-light-secondary dark:text-dark-secondary">
                    Você ainda não tem endereços salvos. Adicione um para agilizar suas futuras compras.
                  </p>
                  <Button
                    className="mt-2 flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90"
                    onClick={handleAdd}
                  >
                    <span className="material-symbols-outlined text-xl">add</span>
                    <span className="truncate">Adicionar Primeiro Endereço</span>
                  </Button>
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex flex-col sm:flex-row items-stretch justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold">{address.street}</h3>
                          {address.isDefault && (
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                              Padrão
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-normal text-text-light-secondary dark:text-dark-secondary">
                          {address.district}, {address.city} - {address.state}
                        </p>
                        <p className="text-sm font-normal text-text-light-secondary dark:text-dark-secondary">
                          CEP: {address.zip}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark px-3 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                          onClick={() => handleEdit(address.id)}
                          disabled={loading}
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                          <span>Editar</span>
                        </Button>
                        <Button
                          className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg px-3 text-sm font-medium text-danger hover:bg-danger/10"
                          onClick={() => handleRemove(address.id)}
                          disabled={loading}
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                          <span>Remover</span>
                        </Button>
                        {!address.isDefault && (
                          <Button
                            className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-background-light dark:bg-background-dark px-3 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                            onClick={() => handleSetDefault(address.id)}
                            disabled={loading}
                          >
                            <span>Definir como padrão</span>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div
                      className="w-full sm:flex-1 rounded-lg bg-cover bg-center min-h-[120px]"
                      data-alt="Map view showing the location of the address"
                      data-location={`${address.city}, ${address.state}`}
                      style={{
                        backgroundImage: `url("${address.mapUrl}")`,
                      }}
                    ></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}