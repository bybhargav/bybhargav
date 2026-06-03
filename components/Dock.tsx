'use client';

import type { WindowId } from './Window';

type DockItem = { label: string; icon: string; id: WindowId };
const items: DockItem[] = [
  { label: 'Finder/Home', icon: '▤', id: 'about' },
  { label: 'Calendar', icon: '▧', id: 'experience' },
  { label: 'Notes', icon: '▨', id: 'resume' },
  { label: 'Terminal', icon: '▸', id: 'github' },
  { label: 'VS Code', icon: '⌘', id: 'projects' },
  { label: 'Figma', icon: '◇', id: 'skills' },
  { label: 'Web/Globe', icon: '◎', id: 'contact' },
  { label: 'Trash', icon: '▱', id: 'github' },
];

export default function Dock({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className="dock" role="toolbar" aria-label="Dock">
      {items.map((item) => (
        <button className="dock-icon" key={item.label} type="button" onClick={() => onOpen(item.id)} aria-label={item.label}>
          {item.icon}
        </button>
      ))}
    </div>
  );
}
