import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Button } from 'antd';
import CourseForm from './CourseForm';
import StudentTable from './StudentsTable';

const AdminSide = ({ onSubmit }) => {
  const [courseData, setCourseData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);

  const handleCourseSubmit = (course) => {
    setCourseData([course, ...courseData]);
    console.log("🚀 ~ file: AdminSide.jsx:12 ~ handleCourseSubmit ~ courseData:", courseData);
  };

  const handleStudentSubmit = (student) => {
    setStudentsData([student, ...studentsData]);
  };

  const handleClearData = () => {
    setCourseData([]);
    setStudentsData([]);
    console.log("🚀 ~ file: AdminSide.jsx:23 ~ handleCourseSubmit ~ courseData:", courseData);
  }
  const handleConsoleData = () => {
    console.log("🚀 ~ file: AdminSide.jsx:23 ~ handleCourseSubmit ~ courseData:", courseData);
  }

  return (
    <div className='t-relative t-overflow-y-auto t-overflow-x-hidden t-max-w-[100vw] t-min-h-[100vh] t-px-10 lg:t-px-10 xl:t-px-0'>
      <div className='t-mt-30 t-max-w-[1100px] lg:t-mx-auto t-h-[calc(100vh-6.8rem)] lg:t-h-[calc(100vh-12.8rem)]'>
        <div className='t-bg-white t-p-12 t-pb-18 t-border t-rounded-md lg:t-px-40 lg:t-pt-40 lg:t-pb-18'>
          <div className='t-text-big t-font-bold lg:t-text-xl ng-star-inserted t-text-black'>
            Course Creation
          </div>
          <div className='t-mt-14 t-text-neutral-3 t-text-small ty:t-text-default lg:t-text-medium t-border-solid t-border-b t-border-b-neutral-1/10 t-w-full t-pb-20'>create course details here</div>
          <div className='t-mt-10'>
            <CourseForm onSubmit={handleCourseSubmit} />
          </div>
          <div>
            <StudentTable data={studentsData} />
          </div>
          <div className='t-flex'>
            <Button type="primary" htmlType="submit" onClick={handleClearData}>
              Clear Course Data
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleConsoleData}>
              Console Course Data
            </Button>
          </div>
        </div>
      </div>
    </div>    
  );
}

export default AdminSide;
