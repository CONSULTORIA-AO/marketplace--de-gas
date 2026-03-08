"use client"
import { BadgeCountProps } from "@/types/customer";

export function BadgeCount({ n }: BadgeCountProps) {
  return (
    <span style={{position:"absolute",top:2,right:2,minWidth:16,height:16,borderRadius:8,background:"#EF4444",color:"white",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>
      {n}
    </span>
  );
}