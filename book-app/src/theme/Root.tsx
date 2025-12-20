import React, { type ReactNode } from 'react';
import ChatWidget from '../components/ChatWidget';

export default function Root({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}
