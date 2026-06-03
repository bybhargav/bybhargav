'use client';

import { techStack } from '@/data/skills';
import type { WindowId } from '../Window';

export default function AboutWindow({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className="about-layout">
      <div className="about-copy">
        <p className="eyebrow">AI Builder & Designer</p>
        <h1>Hi, I’m bybhargav</h1>
        <h2>AI Builder & Designer</h2>
        <p className="tagline">Builder of things that shouldn&apos;t exist yet.</p>
        <p>I design intelligent systems, sharp interfaces, and web experiences that feel built from the future’s scrap metal.</p>
        <div className="button-row">
          <button type="button" onClick={() => onOpen('projects')}>View My Work</button>
          <button type="button" className="secondary" onClick={() => onOpen('resume')}>Download Resume</button>
        </div>
      </div>
      <div className="avatar-panel" aria-label="Pixel avatar placeholder">
        <div className="pixel-avatar"><span /></div>
        <small>avatar.asset / replace-ready</small>
      </div>
      <div className="tech-stack">
        <strong>Tech Stack</strong>
        <div>{techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>
      </div>
    </div>
  );
}
