// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './component/Dashboard';
import CityDetail from './component/CityDetail';
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/:cityId" element={<CityDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;