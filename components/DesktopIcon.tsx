'use client';

import type { WindowId } from './Window';

type Props = { label: string; icon: string; windowId: WindowId; onOpen: (id: WindowId) => void };

export default function DesktopIcon({ label, icon, windowId, onOpen }: Props) {
  return (
    <button className="desktop-icon" type="button" onClick={() => onOpen(windowId)}>
      <span className="pixel-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
