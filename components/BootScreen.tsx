'use client';

import { useEffect } from 'react';

type Props = { onComplete: () => void };

export default function BootScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2100);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <main className="boot-screen" role="status" aria-live="polite">
      <div className="boot-box">
        <p className="boot-kicker">BHARGAV BIOS / BUILD 2.0</p>
        <h1>Initializing Bhargav OS 2.0...</h1>
        <div className="boot-log">
          <span>[ok] mounting desktop.shell</span>
          <span>[ok] loading amber pixel interface</span>
          <span>[ok] preparing selected builds channel</span>
        </div>
        <div className="loading-frame"><span /></div>
      </div>
    </main>
  );
}
