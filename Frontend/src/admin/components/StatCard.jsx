const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
