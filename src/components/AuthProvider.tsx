import { BedrockPassportProvider } from '@bedrock_org/passport';
import type { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <BedrockPassportProvider
      baseUrl="https://api.bedrockpassport.com"
      authCallbackUrl='http://localhost:5173/auth/callback'
      tenantId= 'orange-tshl0b1t3i'
      subscriptionKey={import.meta.env.VITE_SUBSCRIPTION_KEY}
    >
      {children}
    </BedrockPassportProvider>
  );
}