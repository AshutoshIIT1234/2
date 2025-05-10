import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useBedrockPassport } from '@bedrock_org/passport';
import { AuthProvider } from './components/AuthProvider';
import { VirtualCompanion } from './components/VirtualCompanion';
import { Login } from './components/Login';
import AuthCallback from './components/AuthCallback';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useBedrockPassport();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <VirtualCompanion />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
