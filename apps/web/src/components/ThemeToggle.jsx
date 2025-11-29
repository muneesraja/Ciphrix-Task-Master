import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export const ThemeToggle = ({ className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
        variant="ghost"
        size="icon"
        className={`relative h-8 w-8 rounded-full overflow-hidden transition-all duration-500 hover:bg-background ${className}`}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
        <Sun className={`absolute h-5 w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
        <Moon className={`absolute h-5 w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
    </Button>
  );
};
