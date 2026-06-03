'use client';

import { useEffect, useState } from 'react';
import type { WindowId } from './Window';

type Props = { onOpen: (id: WindowId) => void };

const menu: Array<{ label: string; id: WindowId }> = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function MenuBar({ onOpen }: Props) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <nav className="menu-bar" aria-label="Bhargav OS menu">
      <div className="menu-left">
        <button className="os-logo" type="button" onClick={() => onOpen('about')} aria-label="Home">▥</button>
        <strong>Bhargav OS 2.0</strong>
        {menu.map((item) => <button type="button" key={item.id} onClick={() => onOpen(item.id)}>{item.label}</button>)}
      </div>
      <div className="menu-right" aria-label="System status">
        <span>⌁</span><span>▰</span><button type="button" onClick={() => onOpen('github')}>{time}</button>
      </div>
    </nav>
  );
}
