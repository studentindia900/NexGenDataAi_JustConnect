import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Mic, 
  Menu, 
  User, 
  ChevronRight, 
  Star, 
  CheckCircle, 
  Phone, 
  Cpu, 
  BarChart, 
  Cloud, 
  Code, 
  Shield, 
  Globe, 
  Briefcase, 
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Category, Listing } from './types';

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6" />,
  BarChart: <BarChart className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (catId?: number, search?: string) => {
    setLoading(true);
    try {
      const catRes = await fetch('/api/categories');
      const cats = await catRes.json();
      setCategories(cats);

      let url = '/api/listings';
      if (catId) url += `?categoryId=${catId}`;
      else if (search) url += `?search=${encodeURIComponent(search)}`;

      const listRes = await fetch(url);
      const lists = await listRes.json();
      setListings(lists);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCategory(null);
    fetchData(undefined, searchQuery);
  };

  const handleCategoryClick = (id: number) => {
    const newId = selectedCategory === id ? null : id;
    setSelectedCategory(newId);
    fetchData(newId || undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-indigo-900">NexgenDataAI</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">B2B</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Gov of India Intiative Lean Projects</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Hello Doctors</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">AI Services</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors md:hidden">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <button className="hidden md:block px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              Free Listing
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight"
          >
            Search Everything. <span className="text-indigo-600">AI Powered.</span>
          </motion.h1>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-200">
              <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Bangalore" 
                  className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
              <div className="flex-[2] flex items-center px-4 gap-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for AI, Data, Cloud..." 
                  className="w-full py-3 outline-none text-slate-700 placeholder:text-slate-400"
                />
                <Mic className="w-5 h-5 text-slate-400 cursor-pointer hover:text-indigo-600 shrink-0" />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Popular:', 'AI Agents', 'Data Lakes', 'Cloud Migration', 'MLOps'].map((tag, i) => (
              <span key={tag} className={`text-sm ${i === 0 ? 'text-slate-500' : 'text-indigo-600 font-medium cursor-pointer hover:underline'}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-16">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ y: -4 }}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all border ${
                selectedCategory === cat.id 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-inner' 
                  : 'bg-white border-slate-100 text-slate-600 hover:shadow-md hover:border-indigo-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedCategory === cat.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-500'
              }`}>
                {iconMap[cat.icon]}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-center">{cat.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Listings Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Filters</h3>
                <div className="space-y-3">
                  {['Verified Only', 'Top Rated', 'Open Now', 'Near Me'].map(filter => (
                    <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-indigo-400 transition-colors" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-indigo-900 rounded-2xl text-white">
                <h4 className="font-bold mb-2">Grow your business</h4>
                <p className="text-xs text-indigo-200 mb-4">List your AI services on NexgenDataAI and reach more clients.</p>
                <button className="w-full py-2 bg-white text-indigo-900 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedCategory 
                  ? `${categories.find(c => c.id === selectedCategory)?.name} in Bangalore` 
                  : 'Recommended for you'}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Sort by:</span>
                <select className="bg-transparent font-semibold text-slate-900 outline-none cursor-pointer">
                  <option>Relevance</option>
                  <option>Rating</option>
                  <option>Popularity</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6">
                <AnimatePresence mode="popLayout">
                  {listings.map((listing) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={listing.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all group"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto overflow-hidden relative">
                          <img 
                            src={listing.image} 
                            alt={listing.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          {listing.is_verified && (
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter">Verified</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                  {listing.name}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium">{listing.category_name}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-lg">
                                  <span className="text-sm font-bold">{listing.rating}</span>
                                  <Star className="w-3 h-3 fill-current" />
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 font-bold uppercase">{listing.reviews_count} Reviews</span>
                              </div>
                            </div>

                            <div className="space-y-2 mt-4">
                              <div className="flex items-start gap-2 text-sm text-slate-600">
                                <MapPin className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                                <span>{listing.address}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Phone className="w-4 h-4 shrink-0 text-slate-400" />
                                <span>{listing.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex gap-2">
                              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Contact
                              </button>
                              <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                                Enquire Now
                              </button>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {listings.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No results found</h3>
                    <p className="text-slate-500">Try adjusting your search or category filters.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-indigo-900">NexgenDataAI</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                The next generation directory for AI services, data solutions, and local businesses. Powered by Nexgen Data AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600">Trust & Safety</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Connect</h4>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
            <p>© 2026 Nexgen Data AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-600">Privacy</a>
              <a href="#" className="hover:text-slate-600">Terms</a>
              <a href="#" className="hover:text-slate-600">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
