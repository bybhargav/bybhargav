'use client';

import { navLinks } from '@/data/links';
import type { WindowId } from '../Window';

export default function QuickLinks({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <aside className="widget quick-links">
      <h2>Quick Links</h2>
      {navLinks.map((link) => (
        <button type="button" key={link.window} onClick={() => onOpen(link.window as WindowId)}>
          <span>{link.icon}</span>{link.label}
        </button>
      ))}
    </aside>
  );
}
