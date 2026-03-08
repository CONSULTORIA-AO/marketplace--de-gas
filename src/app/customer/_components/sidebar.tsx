"use client"
import { BLUE, BLUE_DARK, BLUE_LIGHT } from "@/constants/costumer";
import { Icon } from "./icon";
import { SidebarProps, View } from "@/types/customer";
import { useNavigate } from "react-router-dom";

export function Sidebar({ user, cart, favorites, goTo, close, currentView }: SidebarProps) {
  const router = useNavigate();
  const items: { icon: string; label: string; v: View; badge?: number }[] = [
    { icon:"home",     label:"Início",          v:"shop"     },
    { icon:"heart",    label:"Favoritos",        v:"favorites", badge: favorites },
    { icon:"cart",     label:"Carrinho",         v:"cart",      badge: cart      },
    { icon:"package",  label:"Meus Pedidos",     v:"orders"   },
    { icon:"chat",     label:"Chat", v:"chat"     },
    { icon:"star",     label:"Subscrições",      v:"subs"     },
    { icon:"user",     label:"Meu Perfil",       v:"profile"  },
    { icon:"settings", label:"Configurações",    v:"settings" },
  ];
  return (
    <div style={{position:"relative",zIndex:1,width:280,background:"white",height:"100vh",display:"flex",flexDirection:"column",boxShadow:"4px 0 20px rgba(0,0,0,0.1)",overflowY:"auto"}}>
      <div style={{background:`linear-gradient(135deg,${BLUE},${BLUE_DARK})`,padding:"24px 20px 20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <span style={{color:"white",fontWeight:900,fontSize:20}}>Angoverso.</span>
          <button onClick={close} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:6,cursor:"pointer"}}>
            <Icon name="close" color="white" size={16}/>
          </button>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:48,height:48,borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(255,255,255,0.5)"}}>
            <img src={user.avatar} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div>
            <p style={{color:"white",fontWeight:700,fontSize:14,margin:0}}>{user.name}</p>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:11,margin:0}}>{user.plan}</p>
          </div>
        </div>
      </div>
      <div style={{flex:1,padding:"8px 0"}}>
        {items.map(({ icon, label, v, badge }) => (
          <button key={v} onClick={() => goTo(v)}
            style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 20px",background:currentView===v?BLUE_LIGHT:"none",border:"none",cursor:"pointer",textAlign:"left",borderLeft:currentView===v?`3px solid ${BLUE}`:"3px solid transparent",transition:"all .15s"}}>
            <Icon name={icon} color={currentView === v ? BLUE : "#6B7280"} size={18}/>
            <span style={{flex:1,fontSize:14,fontWeight:currentView===v?700:500,color:currentView===v?BLUE:"#374151"}}>{label}</span>
            {badge != null && badge > 0 && (
              <span style={{background:BLUE,color:"white",borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{badge}</span>
            )}
          </button>
        ))}
      </div>
      <div style={{padding:"16px 20px",borderTop:"1px solid #F3F4F6"}}>
        <button style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"10px 0",background:"none",border:"none",cursor:"pointer"}} className="bg-red-500 hover:bg-red-600"
        onClick={() => router("/login")}
        >
          <Icon name="logout" color="#EF4444" size={18}/>
          <span style={{fontSize:14,color:"#EF4444",fontWeight:600}}>Terminar Sessão</span>
        </button>
      </div>
    </div>
  );
}