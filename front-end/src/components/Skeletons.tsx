export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card-surface rounded-2xl p-4">
          <div className="skeleton size-12 rounded-xl" />
          <div className="skeleton mt-3 h-5 w-3/4 rounded" />
          <div className="skeleton mt-2 h-3 w-full rounded" />
          <div className="skeleton mt-4 h-3 w-1/3 rounded" />
        </div>
      ))}
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-surface flex items-center justify-between rounded-2xl p-4">
          <div className="flex-1">
            <div className="skeleton h-5 w-1/2 rounded" />
            <div className="skeleton mt-2 h-3 w-3/4 rounded" />
            <div className="skeleton mt-3 h-4 w-20 rounded" />
          </div>
          <div className="skeleton h-9 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mt-5 space-y-8">
      <div className="skeleton aspect-[16/10] w-[86%] rounded-3xl sm:aspect-[2/1] sm:w-[72%]" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton aspect-square rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
