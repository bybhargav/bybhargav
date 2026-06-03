import { contactLinks } from '@/data/links';

export default function ContactWindow() {
  return (
    <div className="contact-list">
      {contactLinks.map((link) => (
        <a key={link.label} href={link.href}>
          <span>▹ {link.label}</span><strong>{link.value}</strong>
        </a>
      ))}
    </div>
  );
}
