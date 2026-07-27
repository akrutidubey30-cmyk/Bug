import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import AppRoutes from './routers/AppRoutes.jsx'
import store from './redux/store.js'
import AuthStorage from './components/AuthStorage.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthStorage />
    <AppRoutes />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: '#1c1c1c',
          color: '#ffffff',
          border: '1px solid #343431',
          fontSize: '13px',
        },
      }}
    />
  </Provider>
)
