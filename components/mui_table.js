import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import 추가
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DynamicTable(file) {
  const [data, setdata] = useState([]);

  // API에서 데이터 가져오는 함수
  const fetchData = async () => {
    try {
      // const myurl = `http://115.68.193.117:8000/net/file-json?filename=${file.data}`;
      const myurl = `http://115.68.193.117:8000/net/file-json-tt?filename=${file.data}`;

      const response = await axios.get(myurl);
      const responseData = response.data;

      if (typeof responseData === 'string') {
        const parsedData = JSON.parse(responseData);

        if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
          const dataArray = Object.keys(parsedData).map(key => parsedData[key]);

          setdata(dataArray);
        } else {
          console.error('Received data is not an object:', parsedData);
        }
      } else {
        console.error('Received data is not a string:', responseData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  console.log("columns",columns);
  console.log("data",data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ position: 'sticky', top: 0, background: 'white' }}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {data.length > 0 ? 'No data available' : 'Loading...'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
