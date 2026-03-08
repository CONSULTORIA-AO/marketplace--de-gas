"use client"
import { ProductCard } from "@/app/customer/_components/productCard";
import { Icon } from "./icon";
import { BLUE, BLUE_LIGHT } from "@/constants/costumer";
import { ShopViewProps } from "@/types/customer";

export function ShopView({ products, categories, activeCategory, setCategory, sortBy, setSort, priceRange, setPriceRange, filterOpen, setFilterOpen, addToCart, toggleFav, favorites, onProductClick, onPayNow }: ShopViewProps) {
  return (
    <div className="fade-in">
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:16,scrollbarWidth:"none"}}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            style={{flexShrink:0,padding:"8px 18px",borderRadius:20,border:`1.5px solid ${activeCategory===c?BLUE:"#E5E7EB"}`,background:activeCategory===c?BLUE:"white",color:activeCategory===c?"white":"#374151",fontWeight:600,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}>
            {c}
          </button>
        ))}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        <span style={{fontSize:13,color:"#6B7280",flex:1}}>{products.length} produtos encontrados</span>
        <button onClick={() => setFilterOpen(!filterOpen)}
          style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:8,border:`1.5px solid ${filterOpen?BLUE:"#E5E7EB"}`,background:filterOpen?BLUE_LIGHT:"white",color:filterOpen?BLUE:"#374151",fontSize:13,fontWeight:600,cursor:"pointer"}}>
          <Icon name="filter" size={14} color={filterOpen ? BLUE : "#374151"}/> Filtros
        </button>
        <select value={sortBy} onChange={e => setSort(e.target.value)}
          style={{padding:"8px 12px",borderRadius:8,border:"1.5px solid #E5E7EB",fontSize:13,color:"#374151",background:"white",cursor:"pointer"}}>
          <option value="relevance">Relevância</option>
          <option value="price-asc">Preço: menor</option>
          <option value="price-desc">Preço: maior</option>
          <option value="rating">Melhor avaliação</option>
        </select>
      </div>

      {filterOpen && (
        <div style={{background:"white",borderRadius:12,padding:20,marginBottom:16,border:"1px solid #E5E7EB",boxShadow:"0 4px 16px rgba(0,0,0,0.06)"}}>
          <p style={{fontWeight:700,fontSize:14,marginBottom:12,color:"#111"}}>Intervalo de Preço</p>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{flex:1}}>
              <label style={{fontSize:12,color:"#6B7280"}}>Mínimo</label>
              <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                style={{width:"100%",padding:"8px 10px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,marginTop:4}}/>
            </div>
            <span style={{color:"#9CA3AF",marginTop:16}}>—</span>
            <div style={{flex:1}}>
              <label style={{fontSize:12,color:"#6B7280"}}>Máximo</label>
              <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                style={{width:"100%",padding:"8px 10px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:13,marginTop:4}}/>
            </div>
            <button onClick={() => setPriceRange([0, 500000])} style={{marginTop:16,padding:"8px 14px",background:BLUE_LIGHT,border:"none",borderRadius:8,color:BLUE,fontSize:12,fontWeight:600,cursor:"pointer"}}>
              Reset
            </button>
          </div>
        </div>
      )}

      {products.length === 0
        ? <div style={{textAlign:"center",padding:"60px 0",color:"#9CA3AF"}}>
            <Icon name="search" size={40} color="#D1D5DB"/><p style={{marginTop:12}}>Nenhum produto encontrado</p>
          </div>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:16}}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} toggleFav={toggleFav}
                isFav={favorites.some(f => f.id === p.id)} onClick={() => onProductClick(p)} onPayNow={onPayNow}/>
            ))}
          </div>
      }
    </div>
  );
}