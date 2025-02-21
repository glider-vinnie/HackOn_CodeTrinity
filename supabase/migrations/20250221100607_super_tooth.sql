/*
  # Initial Schema Setup for Geography Quiz

  1. New Tables
    - quiz_results
      - id (uuid, primary key)
      - user_id (references auth.users)
      - continent (text)
      - score (integer)
      - time_taken (integer, seconds)
      - created_at (timestamp)

  2. Security
    - Enable RLS on quiz_results table
    - Add policies for:
      - Users can insert their own results
      - Anyone can read results (for leaderboard)
*/

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  continent text NOT NULL,
  score integer NOT NULL,
  time_taken integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own results
CREATE POLICY "Users can insert their own results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow anyone to read results for the leaderboard
CREATE POLICY "Anyone can read quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (true);