// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';

// 👇 Import các trang mới
import SearchPage from './page/SearchPage';
import StatisticsPage from './page/StatisticPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Mặc định sẽ là trang tìm kiếm */}
          <Route index element={<SearchPage />} /> 
          <Route path="search" element={<SearchPage />} />

          {/* 👇 Route mới cho trang thống kê */}
          <Route path="reports" element={<StatisticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;