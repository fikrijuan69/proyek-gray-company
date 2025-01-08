import { Routes, Route } from 'react-router-dom';
import LayoutProjects from '../components/atoms/LayoutProjects';

const Projects = () => {
    return (
      <div className='pb-[14rem]'>

      <Routes>
        <Route index element={<LayoutProjects />} />
        {/* <Route path="add" element={<UserForm />} />
        <Route path="edit/:id" element={<EditUsersForm />} /> */}
      </Routes>
    </div>
    );
  }
  
export default Projects;
  