import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Simulação de backend
const mockApi = {
  getAddresses: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: 1,
              street: 'Rua das Flores, 123',
              district: 'Centro',
              city: 'São Paulo',
              state: 'SP',
              zip: '01001-000',
              isDefault: true,
              mapUrl:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE',
            },
            {
              id: 2,
              street: 'Avenida Paulista, 1500',
              district: 'Bela Vista',
              city: 'São Paulo',
              state: 'SP',
              zip: '01310-200',
              isDefault: false,
              mapUrl:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDZcSqDHH0LH-esioRmUD-vPF39BmPkFcdIxWqHXcN7XFnqdZfAt7DR4MfR-hqxrUcuBo0qBESPxwWor4EWCvn1LkZkKCojXGfCdbaQn9KKj33Qt5auECOFbQ424EQzQkZPQZridDXsVXJGAtlTP2xLz9g6jcgUNc77uey_dFk5q0D6q86YxA0w8-TwjnpMH-i-TVjaUrD6VaXYnjAB9cA0KLophTMwS07k3PjcqwEa94rMMjrHE84d4aGU_q571j6mF5KepeSBIBE',
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
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingAddress, setEditingAddress] = useState<any>(null);

  useEffect(() => {
    mockApi.getAddresses().then((data: any) => {
      setAddresses(data);
      setLoading(false);
    });
  }, []);

  const emptyAddress = {
    street: '',
    district: '',
    city: '',
    state: '',
    zip: '',
    mapUrl: 'https://lh3.googleusercontent.com/aida-public/example',
    isDefault: false,
  };

  const handleAdd = async () => {
    setEditingAddress(emptyAddress);
    setOpen(true);
  };

  const handleRemove = async (id: number) => {
    setLoading(true);
    await mockApi.removeAddress(id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    setLoading(false);
  };

  const handleSetDefault = async (id: number) => {
    setLoading(true);
    await mockApi.setDefault(id);
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    setLoading(false);
  };

  // ✅ Corrigido: agora só abre o modal
  const handleEdit = (address: any) => {
    setEditingAddress({ ...address });
    setOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingAddress) return;

    setLoading(true);

    await mockApi.editAddress(editingAddress);

    setAddresses((prev) =>
      prev.map((a) => (a.id === editingAddress.id ? editingAddress : a))
    );

    setLoading(false);
    setOpen(false);
    setEditingAddress(null);
  };

  return (
    <main className="font-display bg-background-light dark:bg-background-dark text-text-light-[#137fec] dark:text-dark-[#137fec]">
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
                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#137fec] px-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#137fec]/90"
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
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex flex-col sm:flex-row items-stretch justify-between gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 md:p-6 shadow-sm border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex flex-[2_2_0px] flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold">
                            {address.street}
                          </h3>
                          {address.isDefault && (
                            <span className="rounded-full bg-[#137fec]/10 px-2.5 py-0.5 text-xs font-semibold text-[#137fec]">
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
                          onClick={() => handleEdit(address)}
                          disabled={loading}
                        >
                          <span className="material-symbols-outlined text-base">
                            edit
                          </span>
                          <span>Editar</span>
                        </Button>

                        <Button
                          className="flex h-9 cursor-pointer items-center justify-center gap-1.5 overflow-hidden rounded-lg px-3 text-sm font-medium text-danger hover:bg-danger/10"
                          onClick={() => handleRemove(address.id)}
                          disabled={loading}
                        >
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
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
                      style={{
                        backgroundImage: `url("${address.mapUrl}")`,
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Editar Endereço</DialogTitle>
          </DialogHeader>

          {editingAddress && (
            <div className="space-y-4">
              <Input
                value={editingAddress.street}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    street: e.target.value,
                  })
                }
                placeholder="Rua"
              />
              <Input
                value={editingAddress.district}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    district: e.target.value,
                  })
                }
                placeholder="Bairro"
              />
              <Input
                value={editingAddress.city}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    city: e.target.value,
                  })
                }
                placeholder="Cidade"
              />
              <Input
                value={editingAddress.state}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    state: e.target.value,
                  })
                }
                placeholder="Estado"
              />
              <Input
                value={editingAddress.zip}
                onChange={(e) =>
                  setEditingAddress({
                    ...editingAddress,
                    zip: e.target.value,
                  })
                }
                placeholder="CEP"
              />
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2 shadow-md hover:scale-105 transition-transform border-4 border-transparent"
            >
              Cancelar
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 shadow-md hover:scale-105 transition-transform border-4 border-transparent"
              onClick={handleSaveEdit}
              disabled={loading}
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
