import { useEffect, useMemo, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchHosts } from "../../../features/admin/userManagement/host.slice";
import { HostHeader } from "./HostHeader";
import { HostTable, HostTableRow } from "./HostTable";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

export default function HostManagementPage() {
  const dispatch = useAppDispatch();
  const { hosts, loading, pagination } = useAppSelector((state) => state.hosts);

  /* ================= STATE ================= */
  const [openAddHost, setOpenAddHost] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<1 | 0 | null>(null);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const rowsPerPage = 10;

  /* ================= API ================= */

  const loadHosts = useCallback(() => {
    dispatch(
      fetchHosts({
        page: page + 1,
        search,
        status,
      })
    );
  }, [dispatch, page, search, status]);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    loadHosts();
  }, [loadHosts]);

  /* ================= HANDLERS ================= */

  const handleAddHost = () => {
    setOpenAddHost(true);
  };

  const handleCloseAddHost = () => {
    setOpenAddHost(false);
  };

  const handleSearch = (searchValue: string, statusValue: 1 | 0 | null) => {
    setPage(0); // reset pagination
    setSearch(searchValue);
    setStatus(statusValue);
  };

  /* ================= TABLE DATA ================= */

  const tableHosts: HostTableRow[] = useMemo(
    () =>
      hosts.map((h) => ({
        id: h.user_id,
        name: h.user_fullName,
        email: h.userCred?.cred_user_email ?? "-",
        addedAt: new Date(h.added_at).toLocaleDateString(),
        isActive: h.user_isActive === 1,
        isVerified: h.user_isVerified === 1,
        propertyCount: h.propertyCount ?? 0,
      })),
    [hosts]
  );

  /* ================= RENDER ================= */

  return (
    <>
      <Box p={3}>
        <HostHeader
          searchTerm={search}
          status={status}
          onSearch={(search, status) => {
            setPage(0);
            setSearch(search);
            setStatus(status);
          }}
          onAdd={handleAddHost}
        />

        <HostTable
          hosts={tableHosts}
          page={page}
          rowsPerPage={rowsPerPage}
          totalPages={pagination?.totalPages || 0}
          loading={loading}
          onPageChange={setPage}
          onAction={(host, mode) => {}}
          onDelete={(host) => {}}
          onRefresh={loadHosts}
        />
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}
