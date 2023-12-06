import { Table as BaseTable, TableBody, TableCell } from '@mui/material'
import { RowConfig } from 'shared/types'
import { TableHeader, TableRow, TableWrapper } from './Table.styles'
import { getCell } from './Table.utils'

export interface TableProps {
  columns: string[]
  rows: RowConfig[]
}

const Table = ({ columns, rows }: TableProps) => {
  return (
    <TableWrapper>
      <BaseTable>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableCell>{column}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ cells }) => (
            <TableRow>
              {cells.map(cell => (
                <TableCell
                  sx={{ padding: cell.type === 'buttons-cell' ? 0 : 3 }}
                >
                  {getCell(cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableWrapper>
  )
}

export default Table
