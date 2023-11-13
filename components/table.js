import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export function CustomTableContainer({ data, columnNames }) {
    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1 }}>
                    <TableRow>
                        {columnNames.map((columnName, index) => (
                            <TableCell key={index}>{columnName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow key={index}>
                                {columnNames.map((columnName, columnIndex) => (
                                    <TableCell key={columnIndex} style={{ whiteSpace: 'pre-wrap' }}>{item[columnName]}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columnNames.length}>No data available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
