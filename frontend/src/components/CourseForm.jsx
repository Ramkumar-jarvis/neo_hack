import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Select } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
const CourseForm = ({ onSubmit }) => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState([]);
  const [numTrainers, setNumTrainers] = useState(1); // Initialize with 1 trainer
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("🚀 ~ file: CourseForm.jsx:12 ~ onFinish ~ values:", values)
    onSubmit(values);
    // form.resetFields();
  };

  const trainerNameOptions = [
    'Trainer 1',
    'Trainer 2',
    'Trainer 3', // Add more options as needed
  ];
  // Function to render trainer name and Gmail fields for a single trainer
  const renderTrainerFields = () => {
    return (
      <div className='t-flex t-gap-6'>
        <Form.Item label="Trainer Name" className='t-basis-[20%]' name="trainerName" required>
          <Select placeholder="Select Trainer Name">
            {trainerNameOptions.map((name, index) => (
              <Option key={index} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Trainer Gmail" name="trainerGmail" required>
          <Input size="large"/>
        </Form.Item>
      </div>
    );
  };

  const renderAdditionalTrainers = () => {
    const trainerFields = [];
    for (let i = 0; i < numTrainers - 1; i++) {
      trainerFields.push(
        <div className='t-flex t-gap-6' key={i}>
          <Form.Item label={`Trainer ${i + 1} Name`} className='t-basis-[20%]' name={`trainerName${i}`} required>
            <Select size="large" placeholder="Select Trainer Name">
              {trainerNameOptions.map((name, index) => (
                <Option key={index} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label={`Trainer ${i + 1} Gmail`} name={`trainerGmail${i}`} required>
            <Input size="large"/>
          </Form.Item>
        </div>
      );
    }
    return trainerFields;
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className='t-flex t-gap-10'>

          <div>
            <Form.Item label="Order ID" name="orderId" required>
              <Input size="large"/>
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Date Range" name="dateRange">
              <RangePicker size="large"
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Number of Trainers" name="numTrainers" required>
          <InputNumber size="large" min={1} defaultValue={1} onChange={(value) => setNumTrainers(value)} />
        </Form.Item>
        {renderTrainerFields()} {/* Always render fields for one trainer */}
        {/* Conditionally render trainer name and Gmail fields */}
        <div>
          {numTrainers > 1 && renderAdditionalTrainers()}
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CourseForm;
