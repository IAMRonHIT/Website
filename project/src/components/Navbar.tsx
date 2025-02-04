import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-lg border-b navbar-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-32">
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`font-['Audiowide'] text-4xl ${
                theme === 'dark' 
                  ? 'text-white' 
                  : 'text-[#003649]'
              }`}
            >
              Ron AI
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}