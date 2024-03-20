import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home/Home.tsx';
import { CaseProvider } from './context/case.tsx';
import AddCase from './routes/AddCase/AddCase.tsx';
import CaseDetail from './routes/CaseDetail/CaseDetail.tsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/add-case', element: <AddCase /> },
  { path: '/cases/:caseId', element: <CaseDetail /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CaseProvider>
      <Toaster />
      <RouterProvider router={router} />
    </CaseProvider>
  </React.StrictMode>,
);
