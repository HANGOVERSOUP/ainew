import * as React from 'react';
import { useEffect , useState} from 'react';
import axios from 'axios';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  // randomCreatedDate,
  // randomTraderName,
  randomId,
  // randomArrayItem,
} from '@mui/x-data-grid-generator';




export default function FullFeaturedCrudGrid({file}) {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [uploadrows,setuploadrows] = useState([]);
  const [apicolumns,setapicolumns]=useState();

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = rows[rows.length-1].id +1 ;

      setRows((oldRows) => [...oldRows, { id,  isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    fetchData(file);
  }, [file]);

  const fetchData = async (file) => {
    try {
      const myurl = `http://115.68.193.117:8000/net/file-json-tt?filename=${file}`;
      console.log("myurl,",myurl);
      // const myurl = `http://115.68.193.117:8000/net/file-json?filename=${file.data}`;
      // const myurl = `http://115.68.193.117:8000/net/file-json-tt?filename=LG_gram_data`;

      const response = await axios.get(myurl);
      const responseData = response.data;

      if (typeof responseData === 'string') {
        const parsedData = JSON.parse(responseData);

        if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
          const dataArray = Object.keys(parsedData).map(key => parsedData[key]);

          const columns = dataArray.length > 0 ? Object.keys(dataArray[0]) : [];
          setapicolumns(columns);
          console.log("columns",columns[8]);

          setRows(dataArray);
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

  

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    // console.log("deleteaa",rows.filter((row) => row.id !== id))
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    // setRows(rows.concat(updatedRow));

    
    setuploadrows(uploadrows.concat(updatedRow));

    console.log("rows",rows);
    console.log("newRowaa",newRow);
    console.log("uploadrows",uploadrows);
    console.log("updatedRow",updatedRow);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = apicolumns
  ? apicolumns.map((columnName, index) => ({
      field: columnName,
      headerName: columnName,
      width: columnName === 'id' ? 70 : 180,
      editable: true,
      ...(columnName === '감성분류'
        ? {
            type: 'singleSelect',
            valueOptions: ['긍정', '부정', '알수없음'],
          }
        : {}),
    }))
  : [];

  // 기본 작업 열 (actions) 추가
  columns.push({
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  });

  return (
    <div>
      <Box
        sx={{
          height: 700,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </div>
  );
}
