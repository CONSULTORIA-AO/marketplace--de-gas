"use client"
import { FieldProps } from "@/types/customer";
import { Icon } from "./icon";

export function Field({ label, placeholder, icon, value, onChange, type = "text" }: FieldProps) {
  return (
    <div>
      <label style={{fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:5}}>{label}</label>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)"}}>
          <Icon name={icon} size={15} color="#9CA3AF"/>
        </div>
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          style={{width:"100%",padding:"10px 12px 10px 34px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,boxSizing:"border-box"}}/>
      </div>
    </div>
  );
}