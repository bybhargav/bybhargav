'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

export type WindowId = 'about' | 'projects' | 'skills' | 'experience' | 'resume' | 'contact' | 'github';

export type WindowState = {
  id: WindowId;
  title: string;
  open: boolean;
  minimized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
};

type Props = {
  state: WindowState;
  active: boolean;
  children: ReactNode;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMove: (id: WindowId, x: number, y: number) => void;
  className?: string;
};

export default function Window({ state, active, children, onFocus, onClose, onMinimize, onMove, className = '' }: Props) {
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!dragging) return;

    const move = (event: PointerEvent) => {
      const maxX = Math.max(12, window.innerWidth - state.width - 12);
      const maxY = Math.max(44, window.innerHeight - 120);
      onMove(
        state.id,
        Math.min(Math.max(12, event.clientX - offset.current.x), maxX),
        Math.min(Math.max(42, event.clientY - offset.current.y), maxY),
      );
    };
    const up = () => setDragging(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, onMove, state.id, state.width]);

  if (!state.open || state.minimized) return null;

  return (
    <section
      className={`os-window ${active ? 'active' : 'inactive'} ${className}`}
      style={{ left: state.x, top: state.y, width: state.width, zIndex: state.zIndex }}
      onPointerDown={() => onFocus(state.id)}
      aria-label={state.title}
    >
      <header
        className="window-titlebar"
        onPointerDown={(event) => {
          if (window.innerWidth < 760) return;
          onFocus(state.id);
          setDragging(true);
          offset.current = { x: event.clientX - state.x, y: event.clientY - state.y };
        }}
      >
        <div className="window-controls">
          <button type="button" className="control close" onClick={() => onClose(state.id)} aria-label={`Close ${state.title}`} />
          <button type="button" className="control min" onClick={() => onMinimize(state.id)} aria-label={`Minimize ${state.title}`} />
          <span className="control max" />
        </div>
        <span className="window-title">{state.title}</span>
        <span className="title-stripes" aria-hidden="true" />
      </header>
      <div className="window-body">{children}</div>
    </section>
  );
}
