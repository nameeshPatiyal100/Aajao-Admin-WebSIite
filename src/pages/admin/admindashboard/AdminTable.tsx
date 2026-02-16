import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
  } from "@mui/material";
  
  export type Column<T> = {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  };
  
  type AdminTableProps<T> = {
    columns: Column<T>[];
    rows: T[];
  };
  
  export default function AdminTable<T>({
    columns,
    rows,
  }: AdminTableProps<T>) {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)} sx={{ fontWeight: 600 }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "-")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  