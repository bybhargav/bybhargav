import { skills } from '@/data/skills';

export default function SkillsWindow() {
  return (
    <div className="skill-panel">
      {skills.map((group) => (
        <section key={group.category}>
          <h3>{group.category}</h3>
          <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
        </section>
      ))}
    </div>
  );
}
