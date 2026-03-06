/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  ChevronRight,
  Palette,
  Sparkles,
  Heart,
  Trash2
} from 'lucide-react';
import { ARTIST_BIO, PRODUCTS, STUDIO_DESC, CONTACT_INFO } from './constants';
import { Product, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-nyia-bg text-[#2d2d2d] font-sans selection:bg-nyia-cyan/20 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-nyia-cyan/10 via-nyia-magenta/5 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-nyia-orange/10 via-nyia-red/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-nyia-cyan/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <img 
              src="/logonyia.png" 
              alt="Nyia Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback if logo file is not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<span class="text-2xl font-serif tracking-widest uppercase nyia-gradient-text">Nyia Art</span>');
              }}
            />
            <div className="flex flex-col items-start">
              <span className="text-xs font-light tracking-widest uppercase text-[#888]">Arte com Amor</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium">
            {['sobre', 'galeria', 'atelie', 'contacto'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)}
                className="hover:nyia-gradient-text transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-nyia-cyan to-nyia-magenta transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-nyia-cyan/5 rounded-full transition-colors"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nyia-magenta text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nyia-magenta text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8 text-2xl uppercase tracking-widest font-serif">
              {['sobre', 'galeria', 'atelie', 'contacto'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left border-b border-nyia-cyan/10 pb-4 hover:nyia-gradient-text transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs uppercase tracking-[0.5em] nyia-gradient-text mb-8 block font-bold"
          >
            Arte Digital Abstrata & Sensorial
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-serif mb-10 leading-[0.9] tracking-tighter">
            Onde a <span className="italic nyia-gradient-text">emoção</span> <br />
            se torna <span className="nyia-gradient-text">luz</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-[#555] leading-relaxed mb-12 font-light">
            {ARTIST_BIO.intro}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => scrollToSection('galeria')}
              className="px-12 py-5 bg-[#2d2d2d] text-white uppercase tracking-widest text-xs hover:bg-nyia-magenta transition-all duration-500 rounded-full nyia-glow"
            >
              Explorar Galeria
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="px-12 py-5 border border-nyia-cyan text-[#2d2d2d] uppercase tracking-widest text-xs hover:bg-nyia-cyan/5 transition-all duration-500 rounded-full"
            >
              A Minha História
            </button>
          </div>
        </motion.div>
        
        {/* Floating Abstract Element */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 md:right-20 w-32 h-32 md:w-48 md:h-48 opacity-20"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#nyia-grad)" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.1,-0.8C83.1,14.1,75.7,28.2,66.4,40.6C57.1,53,45.9,63.7,32.7,70.1C19.5,76.5,4.3,78.6,-10.8,76.5C-25.9,74.4,-40.9,68.1,-53.4,58.3C-65.9,48.5,-75.9,35.2,-80.4,20.4C-84.9,5.6,-83.9,-10.7,-77.9,-25.1C-71.9,-39.5,-60.9,-52,-47.5,-59.2C-34.1,-66.4,-18.3,-68.3,-1.3,-66.1C15.7,-63.9,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            <defs>
              <linearGradient id="nyia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#ff00ff" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </section>

      {/* Sobre Mim Section */}
      <section id="sobre" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-nyia-cyan via-nyia-magenta to-nyia-orange opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl nyia-glow">
              <img 
                src="/src/img/nyiaperfil.jpeg" 
                alt="Nyia Artista" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] nyia-gradient-text font-bold">A Artista</span>
              <h2 className="text-5xl font-serif">Sou Nyia</h2>
            </div>
            <div className="space-y-6 text-[#555] leading-relaxed text-lg font-light">
              <p>{ARTIST_BIO.story}</p>
              <p>{ARTIST_BIO.philosophy}</p>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="font-serif italic text-2xl nyia-gradient-text mt-10"
              >
                "{ARTIST_BIO.invite}"
              </motion.p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-10">
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-nyia-cyan">
                  <Palette size={20} />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#2d2d2d]">Intuitiva</span>
                </div>
                <p className="text-xs text-[#888]">Seguindo a vibração e o impulso criativo.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-nyia-magenta">
                  <Sparkles size={20} />
                  <span className="text-xs uppercase tracking-widest font-bold text-[#2d2d2d]">Luminosa</span>
                </div>
                <p className="text-xs text-[#888]">A luz como linguagem fundamental.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Galeria Section */}
      <section id="galeria" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-xs uppercase tracking-[0.5em] nyia-gradient-text font-bold mb-4 block">Portfólio</span>
          <h2 className="text-5xl font-serif mb-6">Galeria de Obras</h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-nyia-cyan to-nyia-magenta mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group nyia-card-hover"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-8 bg-[#f5f0e6] nyia-glow">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    console.error(`Failed to load image: ${product.imageUrl}`);
                    e.currentTarget.src = `https://picsum.photos/seed/${product.id}/800/800`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-white text-[#2d2d2d] py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 hover:bg-nyia-cyan transition-colors duration-300"
                  >
                    <Plus size={16} />
                    <span>Adicionar ao Carrinho</span>
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] rounded-full font-bold shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-end px-2">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif">{product.title}</h3>
                  <p className="text-xs text-[#888] uppercase tracking-widest font-medium">{product.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-serif nyia-gradient-text font-bold">{product.price}€</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ateliê Section */}
      <section id="atelie" className="py-32 px-6 bg-[#f5f0e6]/50 relative overflow-hidden">
        {/* Artistic Background Shape */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path fill="#00d4ff" d="M785,658.5Q714,817,544,834Q374,851,248.5,731.5Q123,612,130,443Q137,274,277,163Q417,52,580.5,108.5Q744,165,799.5,332.5Q855,500,785,658.5Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 space-y-10"
            >
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] nyia-gradient-text font-bold">O Espaço Sagrado</span>
                <h2 className="text-5xl font-serif">O Ateliê</h2>
              </div>
              <p className="text-xl text-[#555] leading-relaxed font-light">
                {STUDIO_DESC}
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-nyia-cyan to-transparent group-hover:w-24 transition-all duration-500"></div>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold">Criação Ritualista</span>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-nyia-magenta to-transparent group-hover:w-24 transition-all duration-500"></div>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold">Escuta Ativa</span>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-[1px] bg-gradient-to-r from-nyia-orange to-transparent group-hover:w-24 transition-all duration-500"></div>
                  <span className="text-xs uppercase tracking-[0.3em] font-bold">Sem Pressa</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="rounded-3xl overflow-hidden nyia-glow">
                  <img src="/src/img/7.png" alt="Ateliê 1" className="w-full aspect-[3/4] object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-3xl overflow-hidden nyia-glow">
                  <img src="/src/img/8.png" alt="Ateliê 2" className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="rounded-3xl overflow-hidden nyia-glow">
                  <img src="/src/img/9.png" alt="Ateliê 3" className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="rounded-3xl overflow-hidden nyia-glow">
                  <img src="/src/img/10.png" alt="Ateliê 4" className="w-full aspect-[3/4] object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-32 px-6 max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.3em] nyia-gradient-text font-bold">Conectar</span>
              <h2 className="text-5xl font-serif">Contacto & Endereço</h2>
            </div>
            <p className="text-lg text-[#666] leading-relaxed font-light">
              Estou disponível para colaborações, encomendas personalizadas ou apenas para uma conversa sobre arte. Visita o meu espaço ou envia uma mensagem.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-center space-x-8 group">
                <div className="p-5 bg-white rounded-2xl text-nyia-cyan shadow-sm group-hover:nyia-glow transition-all duration-300">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#888] mb-1">Endereço</h4>
                  <p className="text-lg text-[#2d2d2d] font-serif">{CONTACT_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 group">
                <div className="p-5 bg-white rounded-2xl text-nyia-magenta shadow-sm group-hover:nyia-glow transition-all duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#888] mb-1">Email</h4>
                  <p className="text-lg text-[#2d2d2d] font-serif">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-8 group">
                <div className="p-5 bg-white rounded-2xl text-nyia-orange shadow-sm group-hover:nyia-glow transition-all duration-300">
                  <Instagram size={28} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#888] mb-1">Instagram</h4>
                  <p className="text-lg text-[#2d2d2d] font-serif">{CONTACT_INFO.instagram}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[2.5rem] border border-nyia-cyan/10 shadow-xl relative"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-nyia-cyan to-nyia-magenta opacity-10 blur-2xl"></div>
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#888]">Nome</label>
                  <input type="text" className="w-full bg-nyia-bg border border-transparent rounded-xl p-5 focus:border-nyia-cyan outline-none transition-all font-light" placeholder="O seu nome" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#888]">Email</label>
                  <input type="email" className="w-full bg-nyia-bg border border-transparent rounded-xl p-5 focus:border-nyia-magenta outline-none transition-all font-light" placeholder="O seu email" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#888]">Mensagem</label>
                <textarea rows={5} className="w-full bg-nyia-bg border border-transparent rounded-xl p-5 focus:border-nyia-orange outline-none transition-all resize-none font-light" placeholder="Como posso ajudar?"></textarea>
              </div>
              <button className="w-full py-5 bg-[#2d2d2d] text-white uppercase tracking-[0.3em] text-xs font-bold rounded-xl hover:bg-nyia-magenta transition-all duration-500 nyia-glow">
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-nyia-cyan/10 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 relative z-10">
          <div className="flex items-center space-x-4">
            <img src="/logonyia.png" alt="Nyia Logo" className="h-12 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-3xl font-serif tracking-widest uppercase nyia-gradient-text">Nyia Art</span>
          </div>
          <div className="flex space-x-12 text-[10px] uppercase tracking-[0.3em] font-bold text-[#888]">
            <a href="#" className="hover:nyia-gradient-text transition-colors">Privacidade</a>
            <a href="#" className="hover:nyia-gradient-text transition-colors">Termos</a>
            <a href="#" className="hover:nyia-gradient-text transition-colors">Envio</a>
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium">
            © 2026 Nyia Art. Todos os direitos reservados.
          </div>
        </div>
        {/* Artistic Footer Element */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-nyia-cyan/5 to-transparent rounded-full blur-3xl"></div>
      </footer>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-10 border-b border-nyia-cyan/10 flex items-center justify-between">
                <h2 className="text-3xl font-serif">O Teu Carrinho</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-nyia-bg rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-8 bg-nyia-bg rounded-full text-nyia-cyan"
                    >
                      <ShoppingCart size={48} />
                    </motion.div>
                    <div className="space-y-2">
                      <p className="text-[#888] uppercase tracking-[0.3em] text-xs font-bold">O seu carrinho está vazio</p>
                      <p className="text-sm text-[#555] font-light">Ainda não adicionaste nenhuma obra sensorial.</p>
                    </div>
                    <button 
                      onClick={() => { setIsCartOpen(false); scrollToSection('galeria'); }}
                      className="nyia-gradient-text font-bold uppercase tracking-[0.3em] text-[10px] border-b border-nyia-magenta pb-1"
                    >
                      Continuar a explorar
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex space-x-8 group"
                    >
                      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-nyia-bg nyia-glow">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif text-xl mb-1">{item.title}</h4>
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-nyia-cyan">{item.category}</span>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-[#888] hover:text-nyia-red transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-5 bg-nyia-bg px-4 py-2 rounded-xl">
                            <button onClick={() => updateQuantity(item.id, -1)} className="text-nyia-cyan hover:scale-125 transition-transform"><Minus size={14} /></button>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="text-nyia-magenta hover:scale-125 transition-transform"><Plus size={14} /></button>
                          </div>
                          <span className="font-serif text-xl nyia-gradient-text font-bold">{item.price * item.quantity}€</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-10 bg-nyia-bg border-t border-nyia-cyan/10 space-y-8">
                  <div className="flex justify-between items-center text-3xl font-serif">
                    <span>Total</span>
                    <span className="nyia-gradient-text font-bold">{cartTotal}€</span>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full py-6 bg-[#2d2d2d] text-white uppercase tracking-[0.4em] text-xs font-bold rounded-2xl hover:bg-nyia-magenta transition-all duration-500 nyia-glow">
                      Encaminhar Pedido para WhatsApp
                    </button>
                    <p className="text-[9px] text-[#888] uppercase tracking-[0.2em] text-center font-medium">Portes de envio calculados no checkout • Pagamento Seguro</p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
