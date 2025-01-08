interface DashboardStatsProps {
  stats: {
    total_invest: number;
    total_capacity: number;
    total_production: number;
    power_active: number;
    esg_rating: number;
    saving_coal: number;
    co2_avoid: number;
    tree_plants_equal: number;
    capacity_by_type: {
      pltu: number;
      plts: number;
      plta: number;
      pltb: number;
    };
    project_state_by_phase: {
      ebt: {
        pengembangan: number;
        konstruksi: number;
        operasi: number;
      };
      non_ebt: {
        pengembangan: number;
        konstruksi: number;
        operasi: number;
      };
    };
    risk_performance: {
      plts: number;
      pltu: number;
      plta: number;
      pltb: number;
      plan: number;
      target: number;
    };
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div>
      {/* Displaying other stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 px-0">
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">Total Investment</h3>
          <p className="text-xl text-gray-900">${stats.total_invest.toLocaleString()}</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">Total Capacity</h3>
          <p className="text-xl text-gray-900">{stats.total_capacity} MW</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">Total Production</h3>
          <p className="text-xl text-gray-900">{stats.total_production} MWh</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">Power Active</h3>
          <p className="text-xl text-gray-900">{stats.power_active} MW</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">ESG Rating</h3>
          <p className="text-xl text-gray-900">{stats.esg_rating}</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">Coal Saved</h3>
          <p className="text-xl text-gray-900">{stats.saving_coal} tons</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">CO2 Avoided</h3>
          <p className="text-xl text-gray-900">{stats.co2_avoid} tons</p>
        </div>
        <div className="bg-[#f8fffdb6] p-4 rounded-lg border-2 border-gray-700  hover:border-blue-500 transition-all duration-300">
          <h3 className="font-bold text-gray-700">Tree Plants Equal</h3>
          <p className="text-xl text-gray-900">{stats.tree_plants_equal} trees</p>
        </div>
      </div>


    </div>
  );
};

export default DashboardStats;
