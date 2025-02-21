import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Mail, Lock, Github } from 'lucide-react';

const continents = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica'
];

const GeographyGame = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('');

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    setIsLoggedIn(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement regular login logic
    setIsLoggedIn(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic
    setIsLoggedIn(true);
  };

  const selectRandomContinent = () => {
    const randomIndex = Math.floor(Math.random() * continents.length);
    setSelectedContinent(continents[randomIndex]);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Globe className="h-12 w-12 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold">Geography Challenge</h1>
            <p className="text-slate-500">Login to start your geography adventure</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
                  </div>
                  <Button type="submit" className="w-full">Sign Up</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
            >
              <img src="/api/placeholder/20/20" alt="Google logo" className="w-5 h-5" />
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-500" />
            Geography Challenge
          </h1>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
        </header>

        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-slate-200 rounded-lg mb-6 relative">
              <img 
                src="/api/placeholder/800/450" 
                alt="World Map" 
                className="w-full h-full object-cover rounded-lg"
              />
              {selectedContinent && (
                <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow">
                  <p className="font-semibold">Selected: {selectedContinent}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="continent">Choose Continent</Label>
                <select 
                  id="continent"
                  className="w-full mt-2 p-2 border rounded-md"
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value)}
                >
                  <option value="">Select a continent</option>
                  {continents.map(continent => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={selectRandomContinent}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Random Continent
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographyGame;