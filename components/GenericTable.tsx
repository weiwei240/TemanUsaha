import React, { useState } from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import images from '@/constants/images';


export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  flex?: number;
}

interface Props<T>{
  itemData: T[]
  columns: Column<T>[]
}

function GenericTable<T extends object>({ itemData, columns }: Props<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T>(columns[0]?.key as keyof T);
  const [ascending, setAscending] = useState<boolean>(true);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setAscending(!ascending);
    } else {
      setSortColumn(column);
      setAscending(true);
    }
  };

  const sortedData = [...itemData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return ascending ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return ascending
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  return (
    <DataTable>
      <DataTable.Header>
        {columns.map((col) => (
          <DataTable.Title
            key={String(col.key)}
            sortDirection={sortColumn === col.key ? (ascending ? 'ascending' : 'descending') : undefined}
            onPress={() => col.sortable && handleSort(col.key as keyof T)}
            style={{ flex: col.flex ?? 1 }}
          >
            {col.label}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {sortedData.map((item, index) => (
        <DataTable.Row key={index}>
          {columns.map((col, i) => (
            <DataTable.Cell key={i} style={{ flex: col.flex ?? 1 }}>
              <Text>
                {String(item[col.key as keyof T])}
              </Text>
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}

export default GenericTable;