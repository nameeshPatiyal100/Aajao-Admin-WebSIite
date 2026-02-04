import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchHosts } from "../../../features/admin/userManagement/host.slice";
import { HostHeader } from "./HostHeader";
import { HostTable, HostTableRow } from "./HostTable";
import { useDebounce } from "../../../hooks/useDebounce";

export default function HostManagementPage() {
  const dispatch = useAppDispatch();
  const { hosts, loading, pagination } = useAppSelector((state) => state.hosts);

  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchHosts({
        page: page + 1,
        search: debouncedSearch,
      })
    );
  }, [dispatch, page, debouncedSearch]);

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

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);
  

  return (
    <Box p={3}>
      <HostHeader
        searchTerm={searchTerm}
        onSearch={(v) => {
          // setPage(0);
          setSearchTerm(v);
        }}
        onAdd={() => {}}
      />

      <HostTable
        hosts={tableHosts}
        page={page}
        rowsPerPage={rowsPerPage}
        totalPages={pagination?.totalPages || 0}
        loading={loading}
        onPageChange={setPage}
        onAction={(host, mode) => {
          // setSelectedHost(host);
          // setModalMode(mode);
          // setIsAddModalOpen(true);
        }}
        onDelete={(host) => {
          // setSelectedHost(host);
          // setIsDeleteModalOpen(true);
        }}
      />
    </Box>
  );
}
