import { Outlet, Navigate } from 'react-router-dom';
import Sidebar, { SidebarContent } from './Sidebar';
import useAuthStore from '@/store/authStore';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from 'react';

const Layout = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50" />

      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-r">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <span className="font-bold">TaskMaster</span>
        </header>

        <main className="flex-1 overflow-y-auto bg-background/50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
