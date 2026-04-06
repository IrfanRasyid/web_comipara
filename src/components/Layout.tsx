import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Home, Youtube, Twitter, Instagram, MonitorPlay, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Merchandise', href: '/merchandise', icon: ShoppingBag },
    { name: 'Content', href: '/content', icon: MonitorPlay },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-manga-white dark:bg-[#141922] text-manga-black dark:text-manga-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-manga-white dark:bg-[#111827] border-b-4 border-manga-black dark:border-[#F5E6A8] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link to="/" className="text-4xl font-manga tracking-widest text-manga-black dark:text-manga-white hover:text-manga-blue dark:hover:text-manga-yellow transition-colors">
                GPS
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-4 py-2 font-manga tracking-wider text-xl uppercase transition-all duration-200 border-2 border-transparent ${
                        isActive(item.href)
                          ? 'bg-manga-yellow text-manga-black border-manga-black shadow-neo-sm -translate-y-0.5'
                          : 'text-manga-black dark:text-manga-white hover:bg-manga-blue hover:text-manga-white hover:border-manga-black dark:hover:border-manga-white hover:shadow-neo-sm dark:hover:shadow-neo-white hover:-translate-y-0.5'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-2" strokeWidth={2.5} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 border-4 border-manga-black dark:border-[#F5E6A8] bg-manga-white dark:bg-[#111827] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black shadow-neo-sm dark:shadow-neo-white transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-6 h-6" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 border-4 border-manga-black dark:border-[#F5E6A8] bg-manga-white dark:bg-[#111827] text-manga-black dark:text-manga-white hover:bg-manga-yellow hover:text-manga-black shadow-neo-sm dark:shadow-neo-white transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-6 h-6" strokeWidth={2.5} /> : <Moon className="w-6 h-6" strokeWidth={2.5} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 border-4 border-manga-black dark:border-[#F5E6A8] bg-manga-yellow text-manga-black hover:bg-manga-blue hover:text-manga-white focus:outline-none transition-colors shadow-neo-sm dark:shadow-neo-white"
              >
                {isMenuOpen ? <X className="block h-6 w-6" strokeWidth={3} /> : <Menu className="block h-6 w-6" strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-manga-white dark:bg-[#111827] border-b-4 border-manga-black dark:border-[#F5E6A8] transition-colors duration-300">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3 font-manga tracking-wider text-xl uppercase transition-colors border-2 ${
                      isActive(item.href)
                        ? 'bg-manga-yellow text-manga-black border-manga-black shadow-neo-sm'
                        : 'text-manga-black dark:text-manga-white border-transparent hover:bg-manga-blue hover:text-manga-white hover:border-manga-black dark:hover:border-manga-white'
                    }`}
                  >
                    <Icon className="w-6 h-6 mr-3" strokeWidth={2.5} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-manga-yellow text-manga-black border-t-4 border-manga-black dark:border-[#F5E6A8] py-16 mt-16 relative overflow-hidden transition-colors duration-300">
        {/* Halftone dot pattern overlay for footer */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(#111 2px, transparent 2px)',
          backgroundSize: '16px 16px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-6xl font-manga tracking-widest text-manga-black mb-4 uppercase drop-shadow-[4px_4px_0_#F5EBDD]">
              GPS Group
            </span>
            <div className="flex space-x-6 mb-8">
              <a href="#" className="neo-card !bg-manga-black !text-manga-white hover:!bg-manga-red hover:!text-manga-white p-3 rounded-none">
                <Youtube className="w-6 h-6" strokeWidth={2.5} />
              </a>
              <a href="#" className="neo-card !bg-manga-black !text-manga-white hover:!bg-manga-blue hover:!text-manga-white p-3 rounded-none">
                <Twitter className="w-6 h-6" strokeWidth={2.5} />
              </a>
              <a href="#" className="neo-card !bg-manga-black !text-manga-white hover:!bg-manga-blue hover:!text-manga-white p-3 rounded-none">
                <Instagram className="w-6 h-6" strokeWidth={2.5} />
              </a>
            </div>
            <p className="text-manga-black font-bold text-lg tracking-widest uppercase bg-manga-white px-4 py-1 neo-border">
              © 2026 GPS Group
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
