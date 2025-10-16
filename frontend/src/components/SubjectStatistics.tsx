import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { SubjectStat } from '../types';

const SubjectStatistics: React.FC = () => {
  const { data: stats, isLoading, error, fetchData } = useApi<SubjectStat[]>();

  useEffect(() => {
    fetchData('/candidates/statistic');
  }, [fetchData]); 
  if (isLoading) {
    return <p>Loading statistics...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  return (
    <>
      <h2>Overall Subject Statistics</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Subject</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Student Count</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Average Score</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Highest Score</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Lowest Score</th>
          </tr>
        </thead>
        <tbody>
          {stats && stats.map((stat) => (
            <tr key={stat.subjectCode}>
              <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                {stat.subjectName}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {stat.studentCount}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {stat.averageScore?.toFixed(2) ?? 'N/A'}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {stat.highestScore?.toFixed(2) ?? 'N/A'}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {stat.lowestScore?.toFixed(2) ?? 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubjectStatistics;