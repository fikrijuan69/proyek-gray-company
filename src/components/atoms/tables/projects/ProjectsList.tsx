import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PowerPlant {
  type: string;
  capacity: number;
  capacity_actual: number;
  energy_generated_per_year: number;
  equivalent_co2_reduction_per_year: number;
  interconnection: string;
  lat: number;
  lng: number;
}

interface Project {
  id: string;
  name: string;
  coordinate: string;
  power_plants: PowerPlant[];
}

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
        const data: Project[] = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!projects.length) {
    return <div className="text-center py-8">No projects found</div>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{project.name}</h2>
          {/* Map iframe */}
          <div className="mb-4">
            {/* Restrict iframe width */}
            <iframe
                src={`${project.coordinate}`}
                title={`${project.name} location`}
                width="100%"
                height="400"
                className="rounded-lg border border-gray-300 max-w-screen-sm mx-auto w-full"
                loading="lazy"
                allowFullScreen
            ></iframe>
        </div>

            {/* Metrics Table */}
            <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2 text-left">Metric</th>
                    <th className="border px-4 py-2 text-left">Value</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(project || {})
                .filter(([key]) => key !== 'power_plants') 
                .map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 capitalize break-words whitespace-normal">
                    {key.replace(/_/g, ' ')}
                    </td>
                    <td className="border px-4 py-2 break-words break-all whitespace-normal">
                    {typeof value === 'string' && value.includes(',')
                        ? value.split(', ').map((item, idx) => <div key={idx}>{item}</div>)
                        : value !== null
                        ? value.toString()
                        : '-'}
                    </td>
                </tr>
                ))}
                {Object.entries(project.power_plants[0] || {}).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 capitalize break-words whitespace-normal">{key.replace(/_/g, ' ')}</td>
                    <td className="border px-4 py-2 break-words break-all whitespace-normal">
                        {value !== null ? value.toString() : '-'}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>




          {/* Action Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate(`/project/${project.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Settings
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
