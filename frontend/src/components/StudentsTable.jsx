import React from 'react';
import { Table } from 'antd';

const StudentTable = ({ data }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gmail', dataIndex: 'gmail', key: 'gmail' },
    { title: 'Batch', dataIndex: 'batch', key: 'batch' },
    { title: 'Campus', dataIndex: 'campus', key: 'campus' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default StudentTable;
