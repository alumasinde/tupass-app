interface StatusCardProps {
  label: string;
  value: string;
  description: string;
}

export function StatusCard({ label, value, description }: StatusCardProps) {
  return (
    <article className="status-card">
      <span className="status-card__label">{label}</span>
      <strong className="status-card__value">{value}</strong>
      <span className="status-card__description">{description}</span>
    </article>
  );
}
