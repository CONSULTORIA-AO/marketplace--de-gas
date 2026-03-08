"use client"
import { fmt } from "@/data/customer";
import { BLUE } from "@/constants/costumer";
import { Icon } from "./icon";
import { CartViewProps } from "@/types/customer";

export function CartView({ cart, updateQty, removeFromCart, cartTotal, onCheckout, onBack }: CartViewProps) {
  return (
    <div className="fade-in">
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer"}}><Icon name="back" color={BLUE}/></button>
        <h2 style={{fontSize:20,fontWeight:800,color:"#111",margin:0}}>Carrinho ({cart.length})</h2>
      </div>
      {cart.length === 0
        ? <div style={{textAlign:"center",padding:"60px 0",color:"#9CA3AF"}}>
            <Icon name="cart" size={48} color="#D1D5DB"/>
            <p style={{marginTop:12,fontSize:15}}>O seu carrinho está vazio</p>
          </div>
        : <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:20,alignItems:"start"}}>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {cart.map(item => (
                <div key={item.id} style={{background:"white",borderRadius:14,padding:14,display:"flex",gap:12,alignItems:"center",border:"1px solid #F3F4F6",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
                  <img src={item.img} alt="" style={{width:72,height:72,objectFit:"cover",borderRadius:10}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontWeight:600,fontSize:13,marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</p>
                    <p style={{color:BLUE,fontWeight:700,fontSize:15,margin:0}}>{fmt(item.price)}</p>
                  </div>
                  <div style={{display:"flex",alignItems:"center",border:"1.5px solid #E5E7EB",borderRadius:8,overflow:"hidden"}}>
                    <button onClick={() => updateQty(item.id, -1)} style={{padding:"6px 10px",background:"none",border:"none",cursor:"pointer",fontSize:16}}>−</button>
                    <span style={{padding:"6px 12px",fontWeight:700,fontSize:14,borderLeft:"1px solid #E5E7EB",borderRight:"1px solid #E5E7EB"}}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, +1)} style={{padding:"6px 10px",background:"none",border:"none",cursor:"pointer",fontSize:16}}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}>
                    <Icon name="close" size={16} color="#EF4444"/>
                  </button>
                </div>
              ))}
            </div>
            <div style={{background:"white",borderRadius:14,padding:20,border:"1px solid #F3F4F6",minWidth:220,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <h3 style={{fontSize:15,fontWeight:700,marginBottom:14}}>Resumo</h3>
              {cart.map(i => (
                <div key={i.id} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6B7280",marginBottom:6}}>
                  <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:130}}>{i.name} x{i.qty}</span>
                  <span style={{fontWeight:600,flexShrink:0}}>{fmt(i.price * i.qty)}</span>
                </div>
              ))}
              <div style={{borderTop:"1px solid #E5E7EB",marginTop:12,paddingTop:12,display:"flex",justifyContent:"space-between",fontWeight:800,fontSize:16}}>
                <span>Total</span><span style={{color:BLUE}}>{fmt(cartTotal)}</span>
              </div>
              <button onClick={onCheckout}
                style={{width:"100%",marginTop:16,padding:"13px",borderRadius:10,background:BLUE,border:"none",color:"white",fontWeight:700,fontSize:15,cursor:"pointer"}}>
                Finalizar Compra
              </button>
            </div>
          </div>
      }
    </div>
  );
}