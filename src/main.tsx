import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Root from './routes/root';
import Home from './routes/home';
import GachaHistory from './routes/gachaHistory';
import ScoreRecords from './routes/scoreRecords';
import ClockTowerSolutions from './routes/clockTowerSolutions';
import HardBossSolutions from './routes/hardBossSolutions';
import ODTool from './apps/odTool';
import DRTool from './apps/drTool';
import NotFound from './routes/notFound';

// Temporary
import UmaTool from './apps/umaTool';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* Routes navigation */}
          <Route index element={<Home />} />
          <Route path="gacha-history" element={<GachaHistory />} />
          <Route path="score-attack" element={<ScoreRecords />} />
          <Route path="clock-tower" element={<ClockTowerSolutions />} />
          <Route path="hard" element={<HardBossSolutions />} />
          {/* Tools */}
          <Route path="od-tool" element={<ODTool />} />
          <Route path="dr-tool" element={<DRTool />} />
          {/* Temporary */}
          <Route path="uma-tool" element={<UmaTool />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
