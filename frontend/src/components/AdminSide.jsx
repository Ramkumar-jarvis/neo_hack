import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import CourseForm from './CourseForm';
import StudentTable from './StudentsTable';
import axios from 'axios';
const AdminSide = () => {
    const [courseData, setCourseData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    // Initial students data
    useEffect(() => {
        setStudentsData([
            {
                key: '1',
                name: 'John Doe',
                gmail: 'sarah@yopmail.com',
                batch: '2021',
                campus: 'coimbatore',
                phoneNumber: '3456789',
            },
            {
                key: '2',
                name: 'John Doe',
                gmail: 'sarah@yopmail.com',
                batch: '2021',
                campus: 'coimbatore',
                phoneNumber: '3456789',
            },
            // ... add more data if needed
        ]);
    }, []);

    // Handle course submission
    const handleCourseSubmit = (course) => {
        setCourseData([course, ...courseData]);
    };

    // Clear all data
    const handleCourseCreation = () => {
      notification.success({
        message: 'Success',
        description: 'Course created successfully!'
    });
      // const token = localStorage.getItem('jwtToken');
      // axios.get('http://localhost:8181/api/v1/trainer/', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      // .then(response => {
      //   if (response.data.status) {
      //     setTrainerNameOptions(response.data.trainerList);
      //   }
      // })
      // .catch(error => {
      //   console.error("Error fetching trainers:", error);
      // });
    };

    return (
        <div className='t-relative t-overflow-y-auto t-overflow-x-hidden t-max-w-[100vw] t-min-h-[100vh] t-px-10 lg:t-px-10 xl:t-px-0'>
            <div className='t-mt-30 t-max-w-[1100px] lg:t-mx-auto t-h-[calc(100vh-6.8rem)] lg:t-h-[calc(100vh-12.8rem)]'>
                <div className='t-bg-white t-p-12 t-pb-18 t-border t-rounded-md lg:t-px-40 lg:t-pt-40 lg:t-pb-18'>
                    <div className='t-text-big t-font-bold lg:t-text-xl ng-star-inserted t-text-black'>
                        Course Creation
                    </div>
                    <div className='t-mt-14 t-text-neutral-3 t-text-small ty:t-text-default lg:t-text-medium t-border-solid t-border-b t-border-b-neutral-1/10 t-w-full t-pb-20'>
                        Create course details here
                    </div>
                    <div className='t-mt-10'>
                        <CourseForm onSubmit={handleCourseSubmit} />
                    </div>
                    <div>
                        <StudentTable data={studentsData} />
                    </div>
                    <div className='t-flex t-mt-10'>
                        <Button type="primary" onClick={handleCourseCreation}>
                            Course creation
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSide;
