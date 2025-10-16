import React, { useState } from 'react';
import { CandidateData } from '../types';
import { useApi } from '../hooks/useApi'; 
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

  const [regNumber, setRegNumber] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: candidate, isLoading, error, fetchData } = useApi<CandidateData>();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (regNumber.length !== 8) {
      setValidationError('Registration Number must be exactly 8 characters long.');
      return;
    }

    fetchData(`/candidates/search?registrationNumber=${regNumber}`);
  };

  return (
    <>
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

      
      {(error || validationError) && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Error: {error || validationError}
        </p>
      )}

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
              {candidate && candidate.scores.map((score) => (
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
    </>
  );
};

export default ScoreSearch;