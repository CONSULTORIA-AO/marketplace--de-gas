"use client"

import { ProductCardProps } from "@/types/customer";
import { useState } from "react";
import { Icon } from "./icon";
import { Stars } from "./star";
import { BLUE, BLUE_LIGHT } from "@/constants/costumer";
import { fmt } from "@/data/customer";

export function ProductCard({ product, addToCart, toggleFav, isFav, onClick, onPayNow }: ProductCardProps) {
  const [hov, setHov] = useState<boolean>(false);
  const discount: number = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{background:"white",borderRadius:16,overflow:"hidden",border:`1.5px solid ${hov?"#1259C3":"#F3F4F6"}`,
        boxShadow:hov?"0 16px 40px rgba(18,89,195,0.14)":"0 2px 8px rgba(0,0,0,0.05)",
        transform:hov?"translateY(-4px)":"none",transition:"all .25s",cursor:"pointer"}}>
      <div style={{position:"relative",height:180,overflow:"hidden",background:"#F9FAFB"}} onClick={onClick}>
        <img src={product.img} alt={product.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s",transform:hov?"scale(1.06)":"scale(1)"}}/>
        {product.badge && (
          <span style={{position:"absolute",top:8,left:8,padding:"3px 8px",borderRadius:6,background:"#EF4444",color:"white",fontSize:11,fontWeight:700}}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span style={{position:"absolute",top:8,right:40,padding:"3px 7px",borderRadius:6,background:"#10B981",color:"white",fontSize:11,fontWeight:700}}>
            -{discount}%
          </span>
        )}
        <button onClick={e => { e.stopPropagation(); toggleFav(product); }}
          style={{position:"absolute",top:8,right:8,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.9)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon name="heart" size={15} color={isFav ? "#EF4444" : "#9CA3AF"}/>
        </button>
        {product.freeShipping && (
          <span style={{position:"absolute",bottom:8,left:8,padding:"2px 7px",borderRadius:6,background:"rgba(16,185,129,0.9)",color:"white",fontSize:10,fontWeight:600}}>
            Frete grátis
          </span>
        )}
      </div>
      <div style={{padding:12}}>
        <p style={{fontSize:12,color:"#6B7280",marginBottom:2}}>{product.category}</p>
        <p onClick={onClick} style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6,lineHeight:1.35,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {product.name}
        </p>
        <Stars rating={product.rating} small/>
        <p style={{fontSize:10,color:"#9CA3AF",marginBottom:8}}>({product.reviews.toLocaleString()} avaliações)</p>
        <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:10}}>
          <span style={{fontSize:16,fontWeight:900,color:BLUE}}>{fmt(product.price)}</span>
          {product.oldPrice && <span style={{fontSize:11,color:"#9CA3AF",textDecoration:"line-through"}}>{fmt(product.oldPrice)}</span>}
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={e => { e.stopPropagation(); addToCart(product); }}
            style={{flex:1,padding:"8px 0",borderRadius:8,background:BLUE_LIGHT,border:`1.5px solid ${BLUE}`,color:BLUE,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            + Carrinho
          </button>
          <button onClick={e => { e.stopPropagation(); onPayNow(product); }}
            style={{flex:1,padding:"8px 0",borderRadius:8,background:BLUE,border:"none",color:"white",fontSize:12,fontWeight:700,cursor:"pointer"}}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}