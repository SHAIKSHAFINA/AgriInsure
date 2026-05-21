import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapView from './components/MapView';
import PlotForm from './components/PlotForm';
import ResultsCard from './components/ResultsCard';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/plot" element={<PlotForm />} />
          <Route path="/results" element={<ResultsCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;