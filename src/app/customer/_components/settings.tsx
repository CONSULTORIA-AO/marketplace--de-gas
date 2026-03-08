"use client"
import { BLUE } from "@/constants/costumer";
import { NotifSettings, PasswordForm, PrivacySettings, SettingsViewProps } from "@/types/customer";
import { Field } from "./field";
import { useState } from "react";
import { Icon } from "./icon";
import { Card } from "./card";

export function SettingsView({ onBack, notify }: SettingsViewProps) {
  const [passwords, setPasswords] = useState<PasswordForm>({ current:"", next:"", confirm:"" });
  const [notifs, setNotifs]       = useState<NotifSettings>({ email:true, sms:true, promo:false, orders:true });
  const [privacy, setPrivacy]     = useState<PrivacySettings>({ showProfile:true, shareData:false });

  const changePassword = (): void => {
    if (!passwords.current || !passwords.next) return notify("Preencha todos os campos");
    if (passwords.next !== passwords.confirm) return notify("Passwords não coincidem");
    notify("Password alterada com sucesso ✓");
    setPasswords({ current:"", next:"", confirm:"" });
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      style={{width:44,height:24,borderRadius:12,background:value?BLUE:"#D1D5DB",border:"none",cursor:"pointer",position:"relative",transition:"background .2s"}}>
      <div style={{position:"absolute",top:2,left:value?22:2,width:20,height:20,borderRadius:"50%",background:"white",transition:"left .2s"}}/>
    </button>
  );

  return (
    <div className="fade-in" style={{maxWidth:680,margin:"0 auto",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="back" color={BLUE}/></button>
        <h2 style={{fontSize:20,fontWeight:800,margin:0}}>Configurações</h2>
      </div>

      <Card title="Segurança · Alterar Password" icon="lock">
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {([
            { l:"Password actual",        k:"current" },
            { l:"Nova password",          k:"next"    },
            { l:"Confirmar nova password",k:"confirm" },
          ] as { l: string; k: keyof PasswordForm }[]).map(f => (
            <Field key={f.k} label={f.l} placeholder="••••••••" icon="lock" type="password"
              value={passwords[f.k]} onChange={v => setPasswords(p => ({ ...p, [f.k]: v }))}/>
          ))}
          <button onClick={changePassword}
            style={{padding:"10px 24px",borderRadius:8,background:BLUE,border:"none",color:"white",fontWeight:700,fontSize:14,cursor:"pointer",alignSelf:"flex-start"}}>
            Alterar Password
          </button>
        </div>
      </Card>

      <Card title="Notificações" icon="bell">
        {(Object.entries({
          email:"Notificações por email",
          sms:"Notificações por SMS",
          promo:"Promoções e ofertas",
          orders:"Actualizações de pedidos",
        }) as [keyof NotifSettings, string][]).map(([k, label]) => (
          <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #F3F4F6"}}>
            <span style={{fontSize:14,color:"#374151"}}>{label}</span>
            <Toggle value={notifs[k]} onChange={v => setNotifs(n => ({ ...n, [k]: v }))}/>
          </div>
        ))}
      </Card>

      <Card title="Privacidade" icon="eye">
        {(Object.entries({
          showProfile:"Perfil público visível",
          shareData:"Partilhar dados com parceiros",
        }) as [keyof PrivacySettings, string][]).map(([k, label]) => (
          <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #F3F4F6"}}>
            <span style={{fontSize:14,color:"#374151"}}>{label}</span>
            <Toggle value={privacy[k]} onChange={v => setPrivacy(p => ({ ...p, [k]: v }))}/>
          </div>
        ))}
      </Card>
    </div>
  );
}