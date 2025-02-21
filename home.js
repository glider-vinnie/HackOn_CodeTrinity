// HomePage.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';

const continents = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Antarctica'
];

const HomePage = ({ onLogout }) => {
  const [selectedContinent, setSelectedContinent] = useState('');

  const selectRandomContinent = () => {
    const randomIndex = Math.floor(Math.random() * continents.length);
    setSelectedContinent(continents[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-500" />
            Geography Challenge
          </h1>
          <Button variant="outline" onClick={onLogout}>Logout</Button>
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

export default HomePage;