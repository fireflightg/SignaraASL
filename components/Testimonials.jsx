export function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-lg">
      <p className="text-lg mb-4">{"}{quote}{"}</p>
      <p className="text-neutral-400 font-semibold">- {author}</p>
    </div>
  );
}
