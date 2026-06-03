const stats = ['Repos: --', 'Commits: --', 'Streak: --', 'Stars: --'];

export default function GitHubStatsWindow() {
  return <div className="stats-grid">{stats.map((stat) => <span key={stat}>{stat}</span>)}</div>;
}
