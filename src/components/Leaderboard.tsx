import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trophy, Clock, Medal } from 'lucide-react';
import type { QuizResult } from '../types';

export function Leaderboard() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data } = await supabase
        .from('quiz_results')
        .select(`
          *,
          users:user_id (email)
        `)
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true })
        .limit(10);

      if (data) {
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Trophy size={32} className="text-yellow-500" />
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Continent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={result.id} className={index < 3 ? 'bg-yellow-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {index < 3 ? (
                    <Medal size={20} className={`
                      ${index === 0 ? 'text-yellow-500' : ''}
                      ${index === 1 ? 'text-gray-400' : ''}
                      ${index === 2 ? 'text-amber-600' : ''}
                    `} />
                  ) : (
                    <span className="text-gray-500">{index + 1}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{result.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.continent}</td>
                <td className="px-6 py-4 whitespace-nowrap">{result.score}/5</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  {result.time_taken}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}