import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';
import { LogIn, LogOut, Smartphone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-10"
        style={{ backgroundImage: 'url(/assets/generated/meditation-bg.dim_1920x1080.png)' }}
      />
      
      <div className="relative z-10">
        <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/logo.dim_512x512.png" 
                alt="Calma-Mente" 
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-2xl font-display font-semibold text-foreground">
                Calma-Mente
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {identity.getPrincipal().toString().slice(0, 8)}...
                  </span>
                  <Button 
                    onClick={clear} 
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={login} 
                  disabled={isLoggingIn}
                  size="sm"
                  className="gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  {isLoggingIn ? 'Connecting...' : 'Login'}
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-border/50 backdrop-blur-sm bg-background/80 mt-16">
          <div className="container mx-auto px-4 py-6">
            {/* TODO: Update href with actual Play Store or APK download URL when available */}
            <div className="flex justify-center mb-4">
              <a
                href="#android-download"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-300 hover:shadow-glow"
              >
                <Smartphone className="w-5 h-5" />
                <span className="font-medium">Download para Android</span>
              </a>
            </div>
            
            <div className="text-center mb-3">
              <p className="text-base font-medium text-foreground/80">
                Matheus Gama, <span className="text-primary">CEO</span>
              </p>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} Calma-Mente. Built with love using{' '}
                <a 
                  href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
