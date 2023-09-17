import React, { useState, useEffect } from 'react';
import { CalendarOutlined, FieldTimeOutlined, MessageOutlined } from '@ant-design/icons';
import CalendarPanel from './CalendarPanel';
import Schedule from './Schedule';
import { Input, Spin } from 'antd';
import axios from 'axios';
import ChatBox from './ChatBox';
const { Search } = Input;

const IconBox = ({ IconComponent, label, onClick, ...props }) => (
    <div {...props} onClick={onClick} className={`t-w-[120px] t-flex t-flex-col t-h-[120px] t-border t-text-neutral-1 t-rounded-md t-justify-center t-items-center t-cursor-pointer t-transform t-transition-transform t-duration-300 hover:t-bg-white hover:t-scale-110 hover:t-z-10 hover:t-shadow-lg ${label === 'invisible' ? 't-invisible' : 't-visible'}`}>
        <span><IconComponent style={{ fontSize: '20px', color: '#08c' }} /></span>
        <span>{label}</span>
    </div>
);

const UserProfile = () => (
    <div className="t-text-black t-font-medium t-relative t-flex t-gap-20 t-flex-col t-justify-center t-items-center">
        <div id='user_profile' className="t-w-[110px] t-h-[110px] t-relative t-border-4 t-border-white t-outline-2 t-outline t-outline-blue-400 t-overflow-hidden t-border-solid t-bg-blue-400 t-rounded-full">
            <img src="../src/assets/userProfile.jpg" alt="User Profile" />
        </div>
        <div className='t-w-30 t-flex t-justify-center t-items-center t-h-30 t-rounded-full t-bg-primary t-text-white t-font-medium t-absolute t-left-[58%] t-top-[73px]'>2</div>
        <span>Ram kumar</span>
        <span>ramkumar@iamneo.ai</span>
    </div>
);

const TrainerSide = () => {
    const [studentsData, setStudentsData] = useState([]);
    const token = localStorage.getItem('jwtToken');
    const [activeComponent, setActiveComponent] = useState('Calendar'); // Default can be 'Calendar' if you want
    console.log("🚀 ~ file: TrainerSide.jsx:32 ~ TrainerSide ~ activeComponent:", activeComponent)

    useEffect(() => {
        axios.get('http://localhost:8181/api/v1/student/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const { name, email, id } = response.data.studentList[0];
                const currentDate = new Date();
                const twoDaysLater = new Date(currentDate);
                twoDaysLater.setDate(currentDate.getDate() + 2);
                const convertedData = [{
                    key: 1,
                    name,
                    gmail: email,
                    batch: '2021',
                    campus: 'coimbatore',
                    phoneNumber: '3456789',
                    id,
                    startDate: currentDate,
                }, {
                    key: 2,
                    name,
                    gmail: email,
                    batch: '2021',
                    campus: 'chennai',
                    phoneNumber: '78549',
                    id,
                    startDate: twoDaysLater,
                }];

                console.log("🚀 ~ file: TrainerSide.jsx:62 ~ useEffect ~ convertedData:", convertedData)
                setStudentsData(convertedData);
            })
            .catch(error => {
                console.error("Error fetching trainers:", error);
            });
    }, []);

    return (
        <div className='t-relative t-overflow-y-auto t-overflow-x-hidden t-max-w-[100vw] t-min-h-[100vh] t-px-10 lg:t-px-10 xl:t-px-0'>
            <div className='t-h-50 t-w-full t-bg-primary t-bg-opacity-10 t-fixed t-flex t-justify-center t-items-center'>
                <div className='t-flex t-justify-around t-items-center t-w-full'>
                    <span className='t-text-neutral-500 t-font-medium t-text-[24px]'>Trainer</span>
                    <Search placeholder="input search text" onSearch={(value, _e, info) => console.log(info?.source, value)} style={{ width: 200 }} />
                </div>
            </div>
            <div className='t-mt-30 lg:t-mx-auto t-h-[calc(100vh-6.8rem)] t-flex t-gap-16 t-p-30'>
                <div className='t-border t-rounded-md t-p-20 t-min-w-[306px]'>
                    <UserProfile />
                    <div className="t-flex t-flex-wrap t-justify-center t-items-center t-mt-[110px]">
                        <IconBox IconComponent={CalendarOutlined} label="Calendars" onClick={() => setActiveComponent('Calendar')} />
                        <IconBox IconComponent={FieldTimeOutlined} label="Schedule" onClick={() => setActiveComponent('Schedule')} />
                        <IconBox IconComponent={MessageOutlined} label="Feedback" onClick={() => setActiveComponent('Feedback')} />
                        <IconBox className='t-invisible' IconComponent={() => null} label="invisible" />
                    </div>
                </div>
                <div className={`t-bg-white t-border t-rounded-md t-p-20 t-w-full t-shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${studentsData.length ? '' : 't-flex t-justify-center t-items-center'}`}>
                    {
                        activeComponent === 'Calendar' && (
                            studentsData.length && studentsData.every(student => student.startDate !== null)
                                ? <CalendarPanel data={studentsData} />
                                : <Spin tip="Loading" size="large" />
                        )}
                    {activeComponent === 'Schedule' && <Schedule />}
                    {activeComponent === 'Feedback' && <div className="t-h-screen t-w-full">
                        <ChatBox /> </div>}

                </div>
            </div>
        </div>
    );
}

export default TrainerSide;
