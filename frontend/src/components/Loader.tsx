interface LoaderProps {
  variant?: 'card' | 'list' | 'text' | 'default';
  count?: number;
  className?: string;
}

const Loader = ({ variant = 'default', count = 3, className = "" }: LoaderProps) => {
  const skeletons = Array(count).fill(0);

  const renderSkeleton = (type: string, key: number) => {
    switch (type) {
      case 'card':
        return (
          <div key={key} className="glass-card p-6 space-y-4 border-slate-100 shadow-none animate-pulse">
            <div className="flex justify-between items-start">
              <div className="h-5 w-20 bg-slate-200 rounded-full" />
              <div className="h-10 w-10 bg-slate-100 rounded-xl" />
            </div>
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-100 rounded-md" />
              <div className="h-4 w-5/6 bg-slate-100 rounded-md" />
            </div>
            <div className="pt-4 flex gap-3">
              <div className="h-4 w-24 bg-slate-100 rounded-md" />
            </div>
            <div className="h-12 w-full bg-slate-50 border border-slate-100 rounded-xl mt-4" />
          </div>
        );
      case 'list':
        return (
          <div key={key} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl animate-pulse">
            <div className="h-12 w-12 bg-slate-100 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/4 bg-slate-200 rounded-md" />
              <div className="h-3 w-1/2 bg-slate-100 rounded-md" />
            </div>
            <div className="h-8 w-20 bg-slate-50 rounded-lg" />
          </div>
        );
      case 'text':
        return (
          <div key={key} className="space-y-2 animate-pulse">
            <div className="h-4 w-full bg-slate-100 rounded-md" />
            <div className="h-4 w-[90%] bg-slate-100 rounded-md" />
            <div className="h-4 w-[40%] bg-slate-100 rounded-md" />
          </div>
        );
      default:
        return (
          <div
            key={key}
            className="h-24 bg-slate-100 rounded-2xl animate-pulse border border-slate-50"
          />
        );
    }
  };

  return (
    <div className={`grid gap-6 ${variant === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'} ${className}`}>
      {skeletons.map((_, i) => renderSkeleton(variant, i))}
    </div>
  );
};

export default Loader;
