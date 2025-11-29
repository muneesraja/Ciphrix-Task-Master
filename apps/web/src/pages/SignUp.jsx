import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Eye, EyeOff, Lock, Mail, User, Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password, role });
      navigate('/dashboard');
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Branding */}
      <div className="hidden w-1/2 flex-col justify-center items-center bg-black relative overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-center space-y-6 px-12">
            <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">
                Join the <br /> Revolution
            </h1>
            <p className="text-lg text-gray-300 max-w-lg mx-auto">
                Create an account today and start managing your tasks with efficiency and style.
            </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center items-center bg-background p-8 lg:w-1/2 relative transition-colors duration-300">
        <div className="absolute top-4 right-4">
            <ThemeToggle />
        </div>
        <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2 text-blue-500 mb-4">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-medium text-foreground">TaskMaster</h2>
                <h1 className="text-3xl font-bold text-foreground mt-2">Create Account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="name" 
                            placeholder="John Doe" 
                            className="pl-10 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 h-12"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="name@example.com" 
                            className="pl-10 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 h-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-muted-foreground">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            className="pl-10 pr-10 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-blue-500 h-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                         <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="role" className="text-muted-foreground">Role</Label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Select onValueChange={setRole} defaultValue={role}>
                        <SelectTrigger id="role" className="pl-10 bg-muted/50 border-input text-foreground focus:ring-blue-500 h-12">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border text-foreground">
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>

                {error && <p className="text-destructive text-sm">{error}</p>}

                <Button className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account? <Link to="/signin" className="text-blue-600 hover:underline font-medium">Sign In</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
