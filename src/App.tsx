import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { ProfileDetail } from './pages/ProfileDetail';
import { Merchandise } from './pages/Merchandise';
import { Content } from './pages/Content';
import { useEffect } from 'react';
import { useStore } from './store/useStore';

function App() {
  const { fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
