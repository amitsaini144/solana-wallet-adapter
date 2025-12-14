"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface SignatureContextType {
  signedMessage: string;
  setSignedMessage: (message: string) => void;
}

const SignatureContext = createContext<SignatureContextType | undefined>(undefined);

export function SignatureProvider({ children }: { children: ReactNode }) {
  const [signedMessage, setSignedMessage] = useState('');

  return (
    <SignatureContext.Provider value={{ signedMessage, setSignedMessage }}>
      {children}
    </SignatureContext.Provider>
  );
}

export function useSignature() {
  const context = useContext(SignatureContext);
  if (context === undefined) {
    throw new Error('useSignature must be used within a SignatureProvider');
  }
  return context;
}