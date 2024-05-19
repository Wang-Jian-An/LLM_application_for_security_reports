import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


const Custom_table = (props) => {
  const {Data} = props;

  const data = [
    Data[0],
    Data[1],
    Data[2],
    Data[3],
    Data[4],
    Data[5],
    Data[6],
    Data[7],
    Data[8],
    Data[9],

  ]

  console.log(Data);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Drug Name',
        size: 150,
      },
      {
        accessorKey: 'training_data',
        header: 'Training Data',
        size: 150,
      },
      {
        accessorKey: 'predicted MIC', //normal accessorKey
        header: 'Predicted MIC',
        size: 200,
      },
      {
        accessorKey: 'drug resistance threshold',
        header: 'Drug Resistance Threshold',
        size: 150,
      },
      {
        accessorKey: 'drug resistance positive',
        header: 'Drug Resistance Positive',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, 
    enablePagination: false,
  });

  return <MaterialReactTable table={table} />;
};

export default Custom_table;
