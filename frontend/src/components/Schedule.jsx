import React from 'react';
import { Table, Select } from 'antd';

const { Option } = Select;
const userRole = 'admin';
const data = [
    {
        key: '1',
        date: '11-sep-23',
        day: 'Day 1',
        topic: 'Time Complexity',
        subTopic: 'Mathematical Analysis of Recursive and Non Recursive algorithms',
        assessment: 'Na',
        status: 'NA',
    },
    {
        key: '2',
        date: '12-sep-23',
        day: 'Day 2',
        topic: 'Searching',
        subTopic: 'Linear, Binary search',
        assessment: 'Na',
        status: 'NA',
    },
    {
        key: '3',
        date: '13-sep-23',
        day: 'Day 3',
        topic: 'Sorting 1',
        subTopic: 'Bubble sort, Insertion sort, Selection sort',
        assessment: 'Na',
        status: 'NA',
    },
    {
        key: '4',
        date: '14-sep-23',
        day: 'Day 4',
        topic: 'Buffer Day',
        subTopic: 'Buffer Day',
        assessment: 'CC1',
        status: 'CC1',
    },
];
// Function to extract unique filter values from data
const getUniqueFilterValues = (data, dataIndex) => {
    const uniqueValues = [...new Set(data.map(item => item[dataIndex]))];
    return uniqueValues.map(value => ({ text: value, value }));
};
const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        filters: getUniqueFilterValues(data, 'date'),
        onFilter: (value, record) => record.date.indexOf(value) === 0,
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        sortDirections: ['descend'],
    },
    {
        title: 'Day',
        dataIndex: 'day',
    },
    {
        title: 'Topic',
        dataIndex: 'topic',
        filters: getUniqueFilterValues(data, 'topic'),
        onFilter: (value, record) => record.topic.indexOf(value) === 0,
    },
    {
        title: 'Sub Topic',
        dataIndex: 'subTopic',
    },
    {
        title: 'Assessment',
        dataIndex: 'assessment',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => {
            if (userRole === 'student') {
              return text; // Display status as plain text for students
            }
            return (
              <Select 
                defaultValue={text} 
                style={{ width: 120 }} 
                onChange={(value) => handleStatusChange(value, record.key)}
              >
                <Option value="In-progress">In-progress</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Complete">Complete</Option>
              </Select>
            );
          },
    },
];



const handleStatusChange = (value, key) => {
    // Update the local state or make an API call to update the status
    // For example, to update the local state:
    const updatedData = data.map(item => {
        if (item.key === key) {
            return { ...item, status: value };
        }
        return item;
    });
    // Set the updated data (assuming you have a state for it)
    // setData(updatedData);
};
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const Schedule = () => <Table columns={columns} dataSource={data} onChange={onChange} />;

export default Schedule;
