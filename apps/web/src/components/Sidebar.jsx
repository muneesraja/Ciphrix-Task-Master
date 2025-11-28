import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Settings, LogOut, User as UserIcon, Moon, Sun } from 'lucide-react';
import useAuthStore from '@/store/authStore';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const SidebarContent = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-full flex-col justify-between bg-card px-4 py-6">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">TaskMaster</span>
        </div>

        <nav className="space-y-2">
          <Link to="/dashboard">
            <Button
              variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-3"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <div className="relative group">
            <Button
              variant="ghost"
              disabled
              className="w-full justify-start gap-3 opacity-50 cursor-not-allowed"
            >
              <Folder className="h-5 w-5" />
              Projects
            </Button>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-medium">Coming Soon</span>
          </div>
          <div className="relative group">
            <Button
              variant="ghost"
              disabled
              className="w-full justify-start gap-3 opacity-50 cursor-not-allowed"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Button>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-medium">Coming Soon</span>
          </div>
        </nav>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
            <span className="text-sm font-medium ml-2">Theme</span>
            <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full overflow-hidden transition-all duration-500 hover:bg-background"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
                <Sun className={`absolute h-5 w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                <Moon className={`absolute h-5 w-5 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </Button>
        </div>

        {user && (
            <div className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground capitalize">{user.role} User</span>
                </div>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ className }) => {
  return (
    <div className={`border-r bg-card ${className}`}>
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
