import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin({ email, password });
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
                Streamline Your <br /> Workflow
            </h1>
            <p className="text-lg text-gray-300 max-w-lg mx-auto">
                Unlock your team's potential with our intuitive task management platform. Focus on what matters most.
            </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center items-center bg-[#0f172a] p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
            <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2 text-blue-500 mb-4">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-medium text-white">TaskMaster</h2>
                <h1 className="text-3xl font-bold text-white mt-2">Welcome Back</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <Input 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            className="pl-10 bg-[#1e293b] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-12"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            className="pl-10 pr-10 bg-[#1e293b] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-12"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-lg font-medium" type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <div className="text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium">Sign Up</Link>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
