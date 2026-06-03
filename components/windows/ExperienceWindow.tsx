import { experience } from '@/data/experience';

export default function ExperienceWindow() {
  return (
    <div className="log-list">
      {experience.map((item, index) => (
        <article key={item.role}>
          <span>0{index + 1}</span>
          <div><h3>{item.role}</h3><p>{item.detail}</p></div>
        </article>
      ))}
    </div>
  );
}
