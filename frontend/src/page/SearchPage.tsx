// src/pages/SearchPage.tsx
import React from 'react';
import ScoreSearch from '../components/ScoreSearch'; // Đường dẫn có thể cần điều chỉnh

const SearchPage: React.FC = () => {
  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Candidate Score Lookup 🔍</h2>
      <ScoreSearch />
    </div>
  );
};

// Bạn có thể giữ style ở đây hoặc chuyển ra file CSS riêng
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px 40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
    color: '#555',
  },
};

export default SearchPage;