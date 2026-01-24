import { useFormik } from "formik";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { PurpleThemeColor } from "../../../theme/themeColor";
import { Pagination } from "../../../components";
import type { ListingProps } from "./types";
import { statusSchema } from "../../../validations/admin-validations";

export default function Listing({
  statusListing,
  totalRecords,
  loading,
  handlePaginate,
  page,
  rowsPerPage,
  onSave,
}: ListingProps) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { rows: statusListing },
    validationSchema: statusSchema,
    onSubmit: () => {},
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f9fafb" }}>
              <TableRow>
                {[
                  "SR. NO.",
                  "NAME",
                  "TEXT COLOR",
                  "BACKGROUND COLOR",
                  "ACTIONS",
                ].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: 600 }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {formik.values.rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                formik.values.rows.map((row, index) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        name={`rows.${index}.name`}
                        value={row.name}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.rows?.[index] as any)?.name}
                        helperText={(formik.errors.rows?.[index] as any)?.name}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: PurpleThemeColor,
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        name={`rows.${index}.text_color`}
                        value={row.text_color}
                        onChange={formik.handleChange}
                        error={
                          !!(formik.errors.rows?.[index] as any)?.text_color
                        }
                        helperText={
                          (formik.errors.rows?.[index] as any)?.text_color
                        }
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: PurpleThemeColor,
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        size="small"
                        name={`rows.${index}.bg_color`}
                        value={row.bg_color}
                        onChange={formik.handleChange}
                        error={!!(formik.errors.rows?.[index] as any)?.bg_color}
                        helperText={
                          (formik.errors.rows?.[index] as any)?.bg_color
                        }
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: PurpleThemeColor,
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ backgroundColor: PurpleThemeColor }}
                        onClick={() => {
                          statusSchema
                            .validate(row)
                            .then(() => onSave(row))
                            .catch((err) => alert(err.message));
                        }}
                      >
                        Save
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {formik.values.rows.length > 0 && (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <Pagination
              count={Math.ceil(totalRecords / rowsPerPage)}
              page={page}
              onChange={handlePaginate}
            />
          </Box>
        )}
      </Paper>
    </form>
  );
}
