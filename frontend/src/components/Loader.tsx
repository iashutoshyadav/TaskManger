const Loader = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-20 bg-gray-200 rounded-md"
        />
      ))}
    </div>
  );
};

export default Loader;
