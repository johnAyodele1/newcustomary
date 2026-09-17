import { useEffect, useMemo, useState } from 'react';
import { getProducts } from './features/products/products.api';
import type { Product } from './features/products/products.schemas';
import type { ProductSelection } from './features/products/products.types';
import { ProductGrid } from './features/products/ProductGrid';
import { StickyNav } from './features/navigation/StickyNav';
import { Hero } from './features/navigation/Hero';
import { OrderForm } from './features/orders/OrderForm';

const categories = [
  ['jewelry', 'Jewelry & Accessories', 'Engraved pieces for everyday keepsakes.'],
  ['journals', 'Journals & Books', 'Quiet objects for plans, thoughts and stories.'],
  ['bottles', 'Water Bottles', 'Useful things, marked with something personal.'],
  ['gift-boxes', 'Gift Boxes', 'Curated details for occasions that matter.'],
  ['watches', 'Wristwatches', 'Classic timepieces with a personal signature.'],
] as const;

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<ProductSelection[]>([]);
  const [checkout, setCheckout] = useState(false);

  const load = async () => {
    setLoading(true); setError(null);
    try { setProducts(await getProducts()); } catch (err) { setError(err instanceof Error ? err.message : 'Unable to load the collection.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  const grouped = useMemo(() => new Map(categories.map(([id]) => [id, products.filter((product) => product.category === id)])), [products]);
  const beginCheckout = () => { if (orderItems.length) { setCheckout(true); document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' }); } };
  if (checkout) return <><StickyNav onBuy={beginCheckout} /><OrderForm items={orderItems} onDone={() => { setCheckout(false); setOrderItems([]); }} /></>;

  return (
    <div id="top"><StickyNav onBuy={beginCheckout} /><main className="site-main"><Hero />
      {categories.map(([id, title, description], index) => <section className={`section ${index % 2 ? 'section--warm' : ''}`} id={id} key={id}>
        <div className="container"><div className="section-heading"><p className="eyebrow">Collection {String(index + 1).padStart(2, '0')}</p><h2 className="display">{title}</h2><p>{description}</p></div>
          {loading ? <div className="collection-grid" aria-label={`Loading ${title}`}><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div> :
            error ? <div className="quiet-state site-error"><p>{error}</p><button className="button button--outline" type="button" onClick={() => void load()}>Try again</button></div> :
            <ProductGrid products={grouped.get(id) ?? []} onAdd={(item) => setOrderItems((current) => [...current, item])} />}
        </div>
      </section>)}
    </main><footer className="footer"><div><strong className="logo">Customry</strong><p>Personal pieces, made yours.</p></div><div><p>WhatsApp · Instagram</p><small>© {new Date().getFullYear()} Customry. Made with care.</small></div></footer></div>
  );
}
