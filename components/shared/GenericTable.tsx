import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: number;
  render?: (row: T) => React.ReactNode;
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
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#d1fae5', // Tailwind green-100
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 3,
        }}
      >
        <DataTable style={{ backgroundColor: 'white' }}>
          <DataTable.Header>
            {columns.map((col) => (
              <DataTable.Title
                key={String(col.key)}
                style={{ width: col.width ?? 100, paddingVertical: 8, paddingHorizontal: 4 }}
                onPress={() => col.sortable && handleSort(col.key as keyof T)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{
                    color: sortColumn === col.key ? 'green' : 'black',
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginRight: 4,
                  }}>
                    {col.label}
                  </Text>

                  {/* Reserve space for the arrow */}
                  <View style={{ width: 12, alignItems: 'center' }}>
                    {sortColumn === col.key && (
                      <Ionicons
                        name={ascending ? 'caret-down' : 'caret-up'}
                        size={12}
                        color="green"
                      />
                    )}
                  </View>
                </View>
              </DataTable.Title>
            ))}
          </DataTable.Header>

          {sortedData.map((item, index) => (
            <DataTable.Row
            key={index}
            style={{
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderColor: '#e2e8f0', // Tailwind gray-200
            }}
          >
            {columns.map((col, colIndex) => (
              <DataTable.Cell
                key={colIndex}
                style={{
                  width: col.width ?? 100,
                  paddingVertical: 6,
                  paddingHorizontal: 4,
                }}
              >
                {col.render ? (
                  col.render(item)
                ) : (
                  <Text style={{ color: '#1f2937', fontSize: 12 }}>
                    {String(item[col.key])}
                  </Text>
                )}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
}

export default GenericTable;