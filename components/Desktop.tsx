'use client';

import { useCallback, useMemo, useState } from 'react';
import BootScreen from './BootScreen';
import DesktopIcon from './DesktopIcon';
import Dock from './Dock';
import MenuBar from './MenuBar';
import Window, { WindowId, WindowState } from './Window';
import NowPlaying from './widgets/NowPlaying';
import QuickLinks from './widgets/QuickLinks';
import StatusWidget from './widgets/StatusWidget';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import ResumeWindow from './windows/ResumeWindow';
import ContactWindow from './windows/ContactWindow';
import GitHubStatsWindow from './windows/GitHubStatsWindow';
import { navLinks } from '@/data/links';
import { soundHooks } from './sound';

type WindowConfig = Omit<WindowState, 'open' | 'minimized' | 'zIndex'>;

const initialConfigs: WindowConfig[] = [
  { id: 'about', title: 'About Me', x: 250, y: 94, width: 760 },
  { id: 'projects', title: 'Projects', x: 300, y: 120, width: 680 },
  { id: 'skills', title: 'Skills', x: 350, y: 150, width: 560 },
  { id: 'experience', title: 'Experience', x: 330, y: 166, width: 610 },
  { id: 'resume', title: 'Resume', x: 430, y: 190, width: 410 },
  { id: 'contact', title: 'Contact', x: 420, y: 205, width: 470 },
  { id: 'github', title: 'GitHub Stats', x: 910, y: 468, width: 300 },
];

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [topZ, setTopZ] = useState(20);
  const [active, setActive] = useState<WindowId>('about');
  const [windows, setWindows] = useState<WindowState[]>(() =>
    initialConfigs.map((config, index) => ({ ...config, open: config.id === 'about' || config.id === 'github', minimized: false, zIndex: 10 + index })),
  );

  const windowMap = useMemo(() => Object.fromEntries(windows.map((windowState) => [windowState.id, windowState])) as Record<WindowId, WindowState>, [windows]);

  const focusWindow = useCallback((id: WindowId) => {
    setActive(id);
    setTopZ((z) => {
      const next = z + 1;
      setWindows((items) => items.map((item) => item.id === id ? { ...item, zIndex: next, open: true, minimized: false } : item));
      return next;
    });
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    soundHooks.click();
    soundHooks.windowOpen();
    focusWindow(id);
  }, [focusWindow]);

  const closeWindow = useCallback((id: WindowId) => setWindows((items) => items.map((item) => item.id === id ? { ...item, open: false } : item)), []);
  const minimizeWindow = useCallback((id: WindowId) => setWindows((items) => items.map((item) => item.id === id ? { ...item, minimized: true } : item)), []);
  const moveWindow = useCallback((id: WindowId, x: number, y: number) => setWindows((items) => items.map((item) => item.id === id ? { ...item, x, y } : item)), []);

  if (!booted) return <BootScreen onComplete={() => { soundHooks.bootChime(); setBooted(true); }} />;

  return (
    <main className="desktop-shell">
      <div className="wallpaper" aria-hidden="true" />
      <MenuBar onOpen={openWindow} />
      <div className="desktop-icons" aria-label="Desktop shortcuts">
        {navLinks.map((link) => <DesktopIcon key={link.window} label={link.label} icon={link.icon} windowId={link.window as WindowId} onOpen={openWindow} />)}
      </div>

      <Window state={windowMap.about} active={active === 'about'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow} className="about-window">
        <AboutWindow onOpen={openWindow} />
      </Window>
      <Window state={windowMap.projects} active={active === 'projects'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow}>
        <ProjectsWindow />
      </Window>
      <Window state={windowMap.skills} active={active === 'skills'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow}>
        <SkillsWindow />
      </Window>
      <Window state={windowMap.experience} active={active === 'experience'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow}>
        <ExperienceWindow />
      </Window>
      <Window state={windowMap.resume} active={active === 'resume'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow}>
        <ResumeWindow />
      </Window>
      <Window state={windowMap.contact} active={active === 'contact'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow}>
        <ContactWindow />
      </Window>
      <Window state={windowMap.github} active={active === 'github'} onFocus={focusWindow} onClose={closeWindow} onMinimize={minimizeWindow} onMove={moveWindow} className="github-window">
        <GitHubStatsWindow />
      </Window>

      <section className="right-widgets" aria-label="Desktop widgets">
        <NowPlaying />
        <QuickLinks onOpen={openWindow} />
        <StatusWidget />
      </section>
      <Dock onOpen={openWindow} />
      <footer className="status-strip"><span>© 2026 bybhargav. All rights reserved.</span><span>Made with ♥ in 8-bit</span></footer>
    </main>
  );
}
