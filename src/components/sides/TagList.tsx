function TagList({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Highlights</h4>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagList;
