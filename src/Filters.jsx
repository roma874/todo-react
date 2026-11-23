export function Filters({ currentFilter, setFilter, searchQuery, setSearchQuery }) {
  return (
    <>
      <input
        type="text"
        className="search"
        placeholder="🔍 Поиск по задачам..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="filters">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            className={`filter ${currentFilter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
      </div>
    </>
  );
}