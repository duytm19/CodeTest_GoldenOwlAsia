// src/pages/StatisticsPage.tsx
import React from 'react';
import SubjectStatistics from '../components/SubjectStatistics'; // Đường dẫn có thể cần điều chỉnh

const StatisticsPage: React.FC = () => {
  return (
    <div style={styles.card}>
      {/* Component SubjectStatistics đã có sẵn tiêu đề h2 */}
      <SubjectStatistics />
    </div>
  );
};

// Dùng chung style với SearchPage
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px 40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

export default StatisticsPage;