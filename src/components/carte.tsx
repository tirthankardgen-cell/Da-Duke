"use client";
import { useState } from "react";
import { useContent } from "@/components/demo-content";
import MediaImage from "@/components/media-image";
import { safeExternalUrl } from "@/lib/site-utils";

export default function Carte() {
  const { menu, menuCategories, settings } = useContent();
  const [selection, setSelection] = useState<string | null>(null);
  const active = selection && menuCategories.includes(selection) ? selection : null;
  const categories = active ? [active] : menuCategories;
  const pdf = safeExternalUrl(settings.menuPdf);
  return <section className="carte shell" aria-label="Food and beverage menu">
    <div className="carte-preface"><p>{settings.menuNotice}</p>{pdf && <a href={pdf} target="_blank" rel="noopener noreferrer">Open PDF menu ↗</a>}</div>
    <div className="carte-filters" role="group" aria-label="Menu categories">
      {[null, ...menuCategories].map(category => <button key={category || "all"} aria-pressed={active === category} aria-controls="carte-selections" onClick={() => setSelection(category)}>{category || "The complete carte"}</button>)}
    </div>
    <div id="carte-selections" aria-live="polite">
      {categories.map((category, index) => <section className="carte-category" key={category} aria-label={category}>
        <header><span>/{String(index + 1).padStart(2, "0")}</span><h2>{category}</h2><i aria-hidden="true">✳</i></header>
        <div className="carte-items">{menu.filter(item => item.category === category).map(item => <article key={item.id} className={`carte-item ${!item.available ? "carte-unavailable" : ""}`}>
          <div className="carte-item-copy"><div className="carte-item-title"><h3>{item.name}</h3><span>{item.price !== "" ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(item.price)) : "Price to follow"}</span></div>
          <p>{item.description}</p><div className="carte-labels">{!item.available && <span>Currently unavailable</span>}{item.seasonal && <span>Seasonal</span>}{item.recommended && <span>Chef’s recommendation</span>}{item.featured && <span>House signature</span>}{item.dietary && <span>{item.dietary}</span>}</div></div>
          {item.image && <div className="carte-image"><MediaImage id={item.image} sizes="120px" /></div>}
        </article>)}</div>
        {!menu.some(item => item.category === category) && <p className="carte-empty">Something lovely is being prepared. Selections coming soon.</p>}
      </section>)}
      {categories.length === 0 && <p className="carte-empty">Our carte is being prepared. Please visit again soon.</p>}
    </div>
    <p className="carte-closing">Made for long conversations. Best enjoyed slowly.</p>
  </section>;
}
