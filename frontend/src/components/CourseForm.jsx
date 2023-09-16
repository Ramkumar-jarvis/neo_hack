import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Select } from 'antd';
import axios from 'axios';

const { RangePicker } = DatePicker;
const { Option } = Select;

const CourseForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [trainerNameOptions, setTrainerNameOptions] = useState([]);
  const [selectedTrainerEmails, setSelectedTrainerEmails] = useState({});
  const [numTrainers, setNumTrainers] = useState(1); 
  const [selectedTrainerIDs, setSelectedTrainerIDs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    axios.get('http://localhost:8181/api/v1/trainer/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.status) {
        setTrainerNameOptions(response.data.trainerList);
      }
    })
    .catch(error => {
      console.error("Error fetching trainers:", error);
    });
  }, []);

  const handleTrainerNameChange = (value, index) => {
    console.log("🚀 ~ file: CourseForm.jsx:32 ~ handleTrainerNameChange ~ value:", value)
    const trainer = trainerNameOptions.find(t => t.id === value);
    setSelectedTrainerEmails(prevState => ({ ...prevState, [index]: trainer ? trainer.email : '' }));
    // Update the list of selected trainer IDs
    setSelectedTrainerIDs(prevState => {
      const newState = [...prevState];
      newState[index] = trainer ? trainer.name : '';
      return newState;
    });    
    console.log("🚀 ~ file: CourseForm.jsx:35 ~ handleTrainerNameChange ~ selectedTrainerEmails:", selectedTrainerEmails)
  };

  const renderTrainerFields = () => {
    const fields = [];
    for (let i = 0; i < numTrainers; i++) {
      fields.push(
        <div className='t-flex t-gap-6 t-items-center' key={i}>
          <Form.Item label={`Trainer ${i + 1} Name`} className='t-basis-[20%]' name={`trainerName${i}`} required>
            <Select size="large" placeholder="Select Trainer Name" onChange={(value) => handleTrainerNameChange(value, i)}>
              {trainerNameOptions.filter(trainer => !selectedTrainerIDs.includes(trainer.id)).map((trainer) => (
                <Option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
            <Input style={{ pointerEvents: "none" }} className='t-h-[42px] t-mt-[7px] t-basis-[30%]' size="large" value={selectedTrainerEmails[i]} />
        </div>
      );
    }
    return fields;
  };

  return (
    <div>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <div className='t-flex t-gap-10'>
          <div className='t-basis-[30%]'>
            <Form.Item label="Order ID" name="orderId" required>
              <Input size="large" />
            </Form.Item>
          </div>
          <div className='t-basis-[30%]'>
            <Form.Item label="Course Name" name="courseName" required>
              <Input size="large" />
            </Form.Item>
          </div>
        </div>
        <div className='t-flex t-basis-[30%]'>
          <Form.Item label="Date Range" name="dateRange">
            <RangePicker size="large" showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
          </Form.Item>
        </div>
        <Form.Item label="Number of Trainers" name="numTrainers" required>
          <InputNumber size="large" min={1} defaultValue={1} onChange={(value) => setNumTrainers(value)} />
        </Form.Item>
        {renderTrainerFields()}
      </Form>
    </div>
  );
};

export default CourseForm;
