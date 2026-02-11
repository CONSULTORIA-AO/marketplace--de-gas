import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function CheckoutFirstStap(){
    return(
        <div>
            <div className="sm:col-span-2">
            <Label className="flex flex-col w-full">
                <span className="text-slate-700 text-sm font-semibold mb-2">Endereço (Rua/Avenida)</span>
                <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="Avenida Brasil"/>
            </Label>
            </div>

            <div className="sm:col-span-1">
                <Label className="flex flex-col w-full">
                    <span className="text-slate-700 text-sm font-semibold mb-2">Número</span>
                    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="123"/>
                </Label>
            </div>
            <div className="sm:col-span-1">
                <Label className="flex flex-col w-full">
                    <span className="text-slate-700 text-sm font-semibold mb-2">Complemento (Opcional)</span>
                    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="Apto 4B"/>
                </Label>
            </div>

            <div className="sm:col-span-2">
                <Label className="flex flex-col w-full">
                    <span className="text-slate-700 text-sm font-semibold mb-2">Bairro</span>
                    <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="Centro"/>
                </Label>
            </div>
            <div className="sm:col-span-1">
                    <Label className="flex flex-col w-full">
                        <span className="text-slate-700 text-sm font-semibold mb-2">Cidade</span>
                        <Input className="form-input block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all" type="text" value="São Paulo"/>
                    </Label>
            </div>
            <div className="sm:col-span-1">
                <Label className="flex flex-col w-full">
                    <span className="text-slate-700 text-sm font-semibold mb-2">Estado</span>
                    <select className="form-select block w-full rounded-lg border-border-gray bg-white text-slate-900 focus:border-primary focus:ring-primary/20 h-12 px-4 text-base transition-all">
                        <option selected={true} value="SP">São Paulo (SP)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                    </select>
                </Label>
            </div>
        </div>
    )
}