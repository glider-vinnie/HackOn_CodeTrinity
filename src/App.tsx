import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { Quiz } from './components/Quiz';
import { Leaderboard } from './components/Leaderboard';
import { Globe, LogOut } from 'lucide-react';
import type { User } from './types';

const continents = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica'
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold">Geography Quiz</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Choose a Continent</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {continents.map((continent) => (
                    <button
                      key={continent}
                      onClick={() => setSelectedContinent(continent)}
                      className={`p-6 text-lg font-semibold rounded-lg shadow-md transition-colors ${
                        selectedContinent === continent
                          ? 'bg-blue-500 text-white'
                          : 'bg-white hover:bg-blue-50'
                      }`}
                    >
                      {continent}
                    </button>
                  ))}
                </div>
                {selectedContinent && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => navigate('/quiz')}
                      className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Start Quiz
                    </button>
                  </div>
                )}
              </div>
            } />
            <Route
              path="/quiz"
              element={selectedContinent ? <Quiz continent={selectedContinent} /> : <Navigate to="/" />}
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;