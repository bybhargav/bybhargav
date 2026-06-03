export default function NowPlaying() {
  return (
    <aside className="widget">
      <h2>Now Playing</h2>
      <div className="player-row"><span className="music-icon">♪</span><div><strong>lofi beats</strong><small>coding vibes</small></div></div>
      <div className="progress"><span /></div>
      <div className="time-row"><span>1:23 / 3:45</span><span>◀ ❚❚ ▶</span></div>
    </aside>
  );
}
