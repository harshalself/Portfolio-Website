
import { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Projects from './components/Projects';
import Internships from './components/Internships';
import CoCurricular from './components/CoCurricular';
import ExtraCurricular from './components/ExtraCurricular';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'projects':
        return <Projects />;
      case 'internships':
        return <Internships />;
      case 'co-curricular':
        return <CoCurricular />;
      case 'extra-curricular':
        return <ExtraCurricular />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
