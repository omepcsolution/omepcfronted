"use client";
import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { productsList } from '@/data/productsData';
import { fetchPublicProducts, formatINR, getAdminApiUrl } from '@/lib/adminApi';
import { Search, ChevronDown, Send } from 'lucide-react';

/* Map legacy local items to Admin API shape so UI works without backend */
function slugify(s) {
    return String(s || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function localFallbackItems() {
    return productsList.map((p, i) => ({
        name: p.name,
        slug: p.slug || p.id || slugify(p.name),
        description: p.description || p.desc || '',
        price: p.price,
        image: p.image,
        badge: p.badge ?? null,
        sortOrder: p.sortOrder ?? i,
    }));
}

function ProductImage({ product }) {
    const src = product.image || '/product/placeholder.webp';
    const isRemote = /^https?:\/\//i.test(src);
    if (isRemote) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={product.name} className="object-contain w-full h-full" loading="lazy" />;
    }
    return <Image src={src} alt={product.name} fill className="object-contain" />;
}

const ProductCard = ({ product }) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const description = product.description || "";

    const handleEnquire = () => {
        router.push(`/contact?product=${encodeURIComponent(product.slug)}`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(10,92,54,0.18)] border border-emerald-100 hover:border-emerald-200 transition-all duration-300 flex flex-col h-full"
        >
            {/* Top: product image on light bg */}
            <div className="relative w-full aspect-[4/3] bg-[#F2FBF5] p-6 overflow-hidden shrink-0">
                {product.badge != null && product.badge !== '' && (
                    <span className="absolute top-4 left-4 z-10 bg-[#D9F5E6] text-[#0A5C36] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                    </span>
                )}
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <ProductImage product={product} />
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#0A5C36] mb-3 leading-snug line-clamp-2 min-h-[3.25rem]">
                    {product.name}
                </h3>

                <div className="mb-5">
                    <motion.p
                        layout="position"
                        className={`text-sm text-gray-500 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}
                    >
                        {description}
                    </motion.p>
                    {description && description.length > 80 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-800 mt-2 transition-colors"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-emerald-50 flex items-center justify-between gap-3">
                    <span className="text-xl font-black text-[#0A5C36]">
                        {typeof product.price === 'number' ? formatINR(product.price) : product.price}
                    </span>
                    <button
                        onClick={handleEnquire}
                        className="px-4 h-10 rounded-xl bg-[#0A5C36] text-white flex items-center justify-center gap-2 text-sm font-bold hover:bg-emerald-800 transition-colors duration-300 cursor-pointer"
                    >
                        Enquire <Send size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default function ProductCatalog() {
    const [sortOrder, setSortOrder] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQ, setDebouncedQ] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);
    const ITEMS_PER_PAGE = 20;

    // Debounce search input -> API `q` param
    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedQ(searchQuery.trim());
            setCurrentPage(1);
        }, 350);
        return () => clearTimeout(t);
    }, [searchQuery]);

    const loadProducts = useCallback(async (page, q) => {
        setLoading(true);
        const base = getAdminApiUrl();
        // No backend configured -> local fallback (sorted by sortOrder)
        if (!base) {
            const all = localFallbackItems().filter((p) =>
                !q ||
                p.name.toLowerCase().includes(q.toLowerCase()) ||
                (p.description || '').toLowerCase().includes(q.toLowerCase())
            );
            setItems(all.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
            setTotal(all.length);
            setTotalPages(Math.max(1, Math.ceil(all.length / ITEMS_PER_PAGE)));
            setUsingFallback(true);
            setLoading(false);
            return;
        }
        try {
            const data = await fetchPublicProducts({ limit: ITEMS_PER_PAGE, page, q });
            setItems(data.items);
            setTotal(data.total);
            setTotalPages(data.totalPages);
            setUsingFallback(false);
        } catch {
            // Backend unreachable -> graceful local fallback
            const all = localFallbackItems().filter((p) =>
                !q ||
                p.name.toLowerCase().includes(q.toLowerCase()) ||
                (p.description || '').toLowerCase().includes(q.toLowerCase())
            );
            setItems(all.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
            setTotal(all.length);
            setTotalPages(Math.max(1, Math.ceil(all.length / ITEMS_PER_PAGE)));
            setUsingFallback(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-then-set
        loadProducts(currentPage, debouncedQ);
    }, [loadProducts, currentPage, debouncedQ]);

    const visibleProducts = useMemo(() => {
        const result = [...items];
        switch (sortOrder) {
            case 'price-low':
                result.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'price-high':
                result.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // 'latest' = Admin source of truth order (sortOrder)
                result.sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
                break;
        }
        return result;
    }, [items, sortOrder]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const section = document.getElementById('products');
        if (section) {
            const yOffset = -80;
            const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section id="products" className="bg-[#F2FBF5] py-16 md:py-24 min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col min-h-[600px]">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0A5C36]">
                            All Products
                            <span className="text-emerald-600/60 text-lg font-medium ml-3">({total})</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600/60 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full appearance-none bg-white border border-emerald-200 text-emerald-950 text-sm font-semibold rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 shadow-sm transition-colors"
                                />
                            </div>

                            <div className="relative w-full sm:w-auto group">
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full appearance-none bg-white border border-emerald-200 text-emerald-950 text-sm font-semibold rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-emerald-500 cursor-pointer shadow-sm transition-colors"
                                >
                                    <option value="latest">Sort by: Latest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name">Name (A-Z)</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600/60 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 flex-1 items-start">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-emerald-100 animate-pulse">
                                    <div className="aspect-[4/3] bg-[#F2FBF5]" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-5 bg-emerald-100 rounded w-3/4" />
                                        <div className="h-4 bg-emerald-50 rounded w-full" />
                                        <div className="h-4 bg-emerald-50 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : visibleProducts.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 flex-1 items-start">
                            <AnimatePresence mode="popLayout">
                                {visibleProducts.map((product) => (
                                    <ProductCard key={product.slug} product={product} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center flex-1 text-center py-20 bg-white rounded-3xl border border-dashed border-emerald-300">
                            <Search size={48} className="text-emerald-300 mb-4" />
                            <h3 className="text-xl font-bold text-[#0A5C36] mb-2">No products found</h3>
                            <p className="text-gray-500 max-w-sm mb-6">We couldn&apos;t find any products matching your search.</p>
                            <button onClick={() => { setSortOrder('latest'); setSearchQuery(''); }} className="px-5 py-2.5 rounded-lg text-[#0A5C36] font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors">
                                Reset View
                            </button>
                        </div>
                    )}

                    {usingFallback && !loading && (
                        <p className="text-xs text-emerald-700/60 mt-6 text-center">
                            {/* Showing cached catalogue — set NEXT_PUBLIC_ADMIN_API_URL to load live Admin products. */}
                        </p>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-16 pt-8 border-t border-emerald-900/10">
                            <button
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-5 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 text-emerald-950 hover:bg-emerald-100/80 cursor-pointer"
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-11 h-11 rounded-lg font-bold text-sm transition-colors cursor-pointer ${currentPage === i + 1 ? 'bg-[#0A5C36] text-white shadow-md' : 'text-emerald-900/70 hover:bg-emerald-100/80 hover:text-emerald-950'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-5 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 text-emerald-950 hover:bg-emerald-100/80 cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
