"use client"

import { BLUE, BLUE_LIGHT } from "@/constants/costumer";
import { CustomSub, Sub, SubscriptionsViewProps } from "@/types/customer";
import { useState } from "react";
import { Icon } from "./icon";
import { Field } from "./field";

export function SubscriptionsView({ subs, setUser, notify, onBack }: SubscriptionsViewProps) {
  const [activeSub, setActiveSub]   = useState<number | null>(null);
  const [customSub, setCustomSub]   = useState<CustomSub>({ name:"", email:"", prefs:"" });
  const [showCustom, setShowCustom] = useState<boolean>(false);

  const subscribe = (sub: Sub): void => {
    setActiveSub(sub.id);
    setUser(u => ({ ...u, plan: sub.name }));
    notify(`Subscrição "${sub.name}" activada! ✓`);
  };

  return (
    <div className="fade-in" style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="back" color={BLUE}/></button>
        <h2 style={{fontSize:20,fontWeight:800,margin:0}}>Subscrições</h2>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:16,marginBottom:24}}>
        {subs.map(s => (
          <div key={s.id} style={{background:"white",borderRadius:16,padding:24,border:`2px solid ${activeSub===s.id?s.color:"#E5E7EB"}`,
            boxShadow:activeSub===s.id?`0 8px 24px ${s.color}30`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all .2s"}}>
            <div style={{width:44,height:44,borderRadius:12,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
              <Icon name="star" size={22} color="white"/>
            </div>
            <h3 style={{fontSize:16,fontWeight:800,margin:"0 0 4px"}}>{s.name}</h3>
            <p style={{fontSize:22,fontWeight:900,color:s.color,margin:"0 0 8px"}}>{s.price}</p>
            <p style={{fontSize:13,color:"#6B7280",lineHeight:1.5,marginBottom:16}}>{s.desc}</p>
            <button onClick={() => subscribe(s)}
              style={{width:"100%",padding:"10px",borderRadius:10,background:activeSub===s.id?s.color:BLUE_LIGHT,border:`1.5px solid ${activeSub===s.id?s.color:BLUE}`,color:activeSub===s.id?"white":BLUE,fontWeight:700,fontSize:14,cursor:"pointer"}}>
              {activeSub === s.id ? "✓ Subscrito" : "Subscrever"}
            </button>
          </div>
        ))}
      </div>

      <div style={{background:"white",borderRadius:16,padding:24,border:"1px solid #E5E7EB"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:showCustom?16:0}}>
          <div>
            <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 4px"}}>Subscrição Personalizada</h3>
            <p style={{fontSize:13,color:"#6B7280",margin:0}}>Subscreva para receber alertas do que quiser</p>
          </div>
          <button onClick={() => setShowCustom(!showCustom)}
            style={{padding:"8px 16px",borderRadius:8,background:BLUE,border:"none",color:"white",fontWeight:600,fontSize:13,cursor:"pointer"}}>
            {showCustom ? "Fechar" : "Criar"}
          </button>
        </div>
        {showCustom && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <Field label="O que quer receber alertas?" placeholder="ex: iPhone, Apartamentos T3, Nike..." icon="bell"
              value={customSub.prefs} onChange={v => setCustomSub(c => ({ ...c, prefs: v }))}/>
            <Field label="Nome" placeholder="Seu nome" icon="user"
              value={customSub.name} onChange={v => setCustomSub(c => ({ ...c, name: v }))}/>
            <Field label="E-mail para alertas" placeholder="email@exemplo.com" icon="bell"
              value={customSub.email} onChange={v => setCustomSub(c => ({ ...c, email: v }))}/>
            <button
              onClick={() => {
                if (customSub.prefs && customSub.email) {
                  notify(`Alerta criado para: "${customSub.prefs}" ✓`);
                  setCustomSub({ name:"", email:"", prefs:"" });
                  setShowCustom(false);
                } else {
                  notify("Preencha os campos obrigatórios");
                }
              }}
              style={{padding:"10px 24px",borderRadius:8,background:BLUE,border:"none",color:"white",fontWeight:700,fontSize:14,cursor:"pointer",alignSelf:"flex-start"}}>
              Criar Alerta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}