import React, { useState } from 'react';
import axios from 'axios';
import { CandidateData, ApiErrorResponse } from '../types';

// Helper to make subject codes more readable
const subjectNames: { [key: string]: string } = {
  toan: 'Mathematics',
  ngu_van: 'Literature',
  ngoai_ngu: 'Foreign Language',
  lich_su: 'History',
  dia_li: 'Geography',
  gdcd: 'Civic Education',
  vat_li: 'Physics',
  hoa_hoc: 'Chemistry',
  sinh_hoc: 'Biology',
};

const ScoreSearch: React.FC = () => {
  // State management
  const [regNumber, setRegNumber] = useState<string>('');
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Clear previous results and errors
    setIsLoading(true);
    setCandidate(null);
    setError(null);

    // Frontend validation based on your Zod schema
    if (regNumber.length !== 8) {
      setError('Registration Number must be exactly 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/candidates/search?registrationNumber=${regNumber}`
      );
      
      // The backend guarantees a `data` field on success
      setCandidate(response.data.data);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data as ApiErrorResponse;
        // Use the specific error message from the backend
        setError(errorData?.message || 'An unknown error occurred.');
      } else {
        setError('Failed to connect to the server.');
      }
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search Exam Scores 🎓</h1>
      <form onSubmit={handleSearch} style={{ display: 'flex', marginBottom: '2rem' }}>
        <input
          type="text"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          placeholder="Enter registration number (e.g., 01000002)"
          style={{ flexGrow: 1, padding: '12px', fontSize: '16px', border: '1px solid #ccc' }}
          maxLength={8}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '12px 24px', fontSize: '16px' }}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* --- Display Results --- */}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}

      {candidate && (
        <div>
          <h2>Results for Registration #: {candidate.registrationNumber}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Subject</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {candidate.scores.map((score) => (
                <tr key={score.subjectCode}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {subjectNames[score.subjectCode] || score.subjectCode}
                    {score.subjectCode === 'ngoai_ngu' && ` (${score.languageCode})`}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                    {score.value.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScoreSearch;