// import React from "react";

// interface PermissionData {
//   name: string;
//   role: string;
//   approvedBy: string;
//   assignedTime: string;
//   projects: {
//     project_name: string;
//     permissions: {
//       feature: string;
//       actions: { action: string; approval: boolean }[];
//     }[];
//   }[];
// }

// const PermissionsTable: React.FC = () => {
//     const dummyData: PermissionData[] = [
//         {
//           name: "John Doe",
//           role: "Admin",
//           approvedBy: "Manager A",
//           assignedTime: "2023-12-20 08:30",
//           projects: [
//             {
//               project_name: "Cirata",
//               permissions: [
//                 {
//                   feature: "Feature A",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: false },
//                   ],
//                 },
//                 {
//                   feature: "Feature B",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: true },
//                     { action: "Delete", approval: false },
//                   ],
//                 },
//               ],
//             },
//             {
//               project_name: "Karangasem",
//               permissions: [
//                 {
//                   feature: "Feature C",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: false },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           name: "Jane Smith",
//           role: "Editor",
//           approvedBy: "Manager B",
//           assignedTime: "2023-12-21 10:00",
//           projects: [
//             {
//               project_name: "Nusantara",
//               permissions: [
//                 {
//                   feature: "Feature D",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: false },
//                   ],
//                 },
//               ],
//             },
//             {
//               project_name: "Batang",
//               permissions: [
//                 {
//                   feature: "Feature E",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: true },
//                   ],
//                 },
//                 {
//                   feature: "Feature F",
//                   actions: [
//                     { action: "Read", approval: false },
//                     { action: "Write", approval: false },
//                     { action: "Delete", approval: false },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           name: "Michael Johnson",
//           role: "Viewer",
//           approvedBy: "Manager C",
//           assignedTime: "2023-12-22 15:45",
//           projects: [
//             {
//               project_name: "Sunda Strait",
//               permissions: [
//                 {
//                   feature: "Feature G",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: false },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           name: "Emily Davis",
//           role: "Admin",
//           approvedBy: "Manager D",
//           assignedTime: "2023-12-23 09:30",
//           projects: [
//             {
//               project_name: "Lombok",
//               permissions: [
//                 {
//                   feature: "Feature H",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: true },
//                     { action: "Delete", approval: true },
//                   ],
//                 },
//               ],
//             },
//             {
//               project_name: "Bali",
//               permissions: [
//                 {
//                   feature: "Feature I",
//                   actions: [
//                     { action: "Read", approval: false },
//                     { action: "Write", approval: false },
//                   ],
//                 },
//                 {
//                   feature: "Feature J",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: true },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           name: "Sarah Wilson",
//           role: "Contributor",
//           approvedBy: "Manager E",
//           assignedTime: "2023-12-24 13:15",
//           projects: [
//             {
//               project_name: "Komodo",
//               permissions: [
//                 {
//                   feature: "Feature K",
//                   actions: [
//                     { action: "Read", approval: true },
//                     { action: "Write", approval: true },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ];
      

//   return (
//     <div className="min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-black mt-6">User Permissions</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-900 bg-white rounded-lg">
//           <thead className="bg-gray-100 text-black text-sm">
//             <tr>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Name</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Role</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Approved By</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Assigned Time</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Project</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Feature</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Action</th>
//               <th className="border-gray-200 bg-[#e0deded3] border px-4 py-3 text-black font-bold">Approval</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700 border-gray-900 text-sm">
//             {dummyData.map((user, userIndex) => {
//               const userRowSpan = user.projects.reduce(
//                 (total, project) =>
//                   total +
//                   project.permissions.reduce(
//                     (permTotal, perm) => permTotal + perm.actions.length,
//                     0
//                   ),
//                 0
//               );

//               return (
//                 <>
//                   {user.projects.map((project, projectIndex) => {
//                     const projectRowSpan = project.permissions.reduce(
//                       (total, perm) => total + perm.actions.length,
//                       0
//                     );

//                     return project.permissions.map((permission, permIndex) => {
//                       return permission.actions.map((action, actionIndex) => {
//                         const isFirstProject = projectIndex === 0;
//                         const isFirstPermissionAction =
//                           permIndex === 0 && actionIndex === 0;
//                         const isFirstActionInProject = actionIndex === 0;

//                         return (
//                           <tr
//                             key={`user-${userIndex}-project-${projectIndex}-perm-${permIndex}-action-${actionIndex}`}
//                           >
//                             {isFirstProject && isFirstPermissionAction && (
//                               <>
//                                 <td
//                                   className="px-4 py-5 text-black font-semibold text-center border-gray-400 border"
//                                   rowSpan={userRowSpan}
//                                 >
//                                   {user.name}
//                                 </td>
//                                 <td
//                                   className="px-4 py-5 text-black font-semibold text-center border-gray-400 border"
//                                   rowSpan={userRowSpan}
//                                 >
//                                   {user.role}
//                                 </td>
//                                 <td
//                                   className="px-4 py-5 text-black font-semibold text-center border-gray-400 border"
//                                   rowSpan={userRowSpan}
//                                 >
//                                   {user.approvedBy}
//                                 </td>
//                                 <td
//                                   className="px-4 py-5 text-black font-semibold text-center border-gray-400 border"
//                                   rowSpan={userRowSpan}
//                                 >
//                                   {user.assignedTime}
//                                 </td>
//                               </>
//                             )}
//                             {isFirstPermissionAction && (
//                               <td
//                                 className="px-4 py-5 text-black font-semibold text-center border-gray-400 border"
//                                 rowSpan={projectRowSpan}
//                               >
//                                 {project.project_name}
//                               </td>
//                             )}
//                             {isFirstActionInProject && (
//                               <td
//                                 className="px-4 py-5 text-black font-semibold text-center border-gray-400 border"
//                                 rowSpan={permission.actions.length}
//                               >
//                                 {permission.feature}
//                               </td>
//                             )}
//                             <td className="px-4 py-5 text-black font-semibold text-center border-gray-400 border">
//                               {action.action}
//                             </td>
//                             <td className="px-4 py-5 text-black font-semibold text-center border-gray-400 border">
//                               {action.approval ? (
//                                 <span className="text-green-500 font-bold">✅</span>
//                               ) : (
//                                 <span className="text-red-500 font-bold">❌</span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       });
//                     });
//                   })}
//                 </>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PermissionsTable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TypeScript interfaces for API response data
interface Action {
  action: string;
  approval: boolean;
}

interface Permission {
  feature: string;
  actions: Action[];
}

interface Project {
  project_name: string;
  permissions: Permission[];
}

interface User {
  id: string;
  username: string;
  role: string;
  assignedTime: string;
  approvedBy: string;
  projects: Project[];
}

interface ApiResponse {
  message: string;
  result: User[];
}

const UserPermissions: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    axios
      .get<ApiResponse>('https://alobro.my.id/api/v1/admin/user/permissions')
      .then((response) => {
        setData(response.data); // Store data in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  // If still loading, show a loading spinner
  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  // If no data is available, show an error message
  if (!data) {
    return <div className="text-center text-xl text-red-500">No data available</div>;
  }

  return (
    <div className="my-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">Permissions</h1>
      
      <div className="space-y-8">
        {data.result.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg border border-gray-300 border-opacity-30"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {user.username} ({user.role})
            </h2>
            <p className="text-gray-800">Assigned Time: {new Date(user.assignedTime).toLocaleString()}</p>
            <p className="text-gray-800">Approved By: {user.approvedBy}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Projects:</h3>
              {user.projects.map((project) => (
                <div key={project.project_name} className="mt-4">
                  <h4 className="text-md font-semibold text-gray-800">{project.project_name}</h4>
                  <div className="space-y-4 mt-2">
                    {project.permissions.map((permission) => (
                      <div
                        key={permission.feature}
                        className="p-4 border border-gray-300 border-opacity-30 rounded-md bg-gray-50"
                      >
                        <h5 className="text-lg font-semibold text-gray-800">{permission.feature}</h5>
                        <ul className="list-disc ml-6">
                          {permission.actions.map((action, index) => (
                            <li
                              key={index}
                              className="text-gray-700 font-medium text-base leading-relaxed"
                            >
                              {action.action} - Approval: <span className={action.approval ? 'text-green-500' : 'text-red-500'}>{action.approval ? 'Yes' : 'No'}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPermissions;





