import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactSortable } from "react-sortablejs";

interface ApiImage {
  afile_id: number;
  url: string;
}

interface PreviewItem {
  id: string;
  src: string;
  file?: File;
  afile_id?: number;
}

interface MultiImageUploadProps {
  formik: any;
  fieldName: string;
  label?: string;
  maxImages?: number;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  formik,
  fieldName,
  label = "Upload Images",
  maxImages = 10,
}) => {
  const [previews, setPreviews] = useState<PreviewItem[]>([]);

  /* ================= INIT PREVIEWS ================= */
  useEffect(() => {
    const images = formik.values[fieldName] as
      | (File | ApiImage)[]
      | undefined;

    if (!images?.length) {
      setPreviews([]);
      return;
    }

    const mapped: PreviewItem[] = images.map((img) => {
      // ✅ API IMAGE
      if (!(img instanceof File)) {
        return {
          id: `api-${img.afile_id}`,
          src: img.url,           // ✅ THIS WAS THE BUG
          afile_id: img.afile_id,
        };
      }

      // ✅ NEW UPLOAD
      return {
        id: `file-${img.name}-${img.lastModified}`,
        src: URL.createObjectURL(img),
        file: img,
      };
    });

    setPreviews(mapped);
  }, [formik.values[fieldName]]);

  /* ================= HANDLERS ================= */
  const handleRemove = (item: PreviewItem) => {
    // 🔥 API delete
    if (item.afile_id) {
      console.log("Delete image afile_id:", item.afile_id);
      // dispatch(deletePropertyImage(item.afile_id))
    }

    const updated = [...formik.values[fieldName]];
    const index = previews.findIndex((p) => p.id === item.id);
    updated.splice(index, 1);

    formik.setFieldValue(fieldName, updated);
  };

  const handleAdd = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const current = formik.values[fieldName] || [];

    if (current.length + newFiles.length > maxImages) {
      alert(`Max ${maxImages} images allowed`);
      return;
    }

    formik.setFieldValue(fieldName, [...current, ...newFiles]);
  };

  const handleSort = (sorted: PreviewItem[]) => {
    setPreviews(sorted);

    const reordered = sorted.map((p) =>
      p.file ? p.file : { afile_id: p.afile_id!, url: p.src }
    );

    formik.setFieldValue(fieldName, reordered);
  };

  /* ================= RENDER ================= */
  return (
    <Box sx={{ gridColumn: "1 / -1" }}>
      <Typography variant="subtitle1" mb={1}>
        {label}
      </Typography>

      <Button
        variant="outlined"
        component="label"
        sx={{
          // color AIM: "#7b1fa2",
          color: "#7b1fa2",
          borderColor: "#7b1fa2",
          fontWeight: 600,
        }}
      >
        Upload Images
        <input
          hidden
          multiple
          accept="image/*"
          type="file"
          onChange={(e) => handleAdd(e.currentTarget.files)}
        />
      </Button>

      <ReactSortable
        list={previews}
        setList={handleSort}
        animation={150}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}
      >
        {previews.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: 120,
              height: 120,
              borderRadius: 2,
              border: "1px solid #ddd",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "#fff",
                zIndex: 2,
              }}
              onClick={() => handleRemove(item)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Box
              component="img"
              src={item.src}     // ✅ ALWAYS A STRING URL
              alt="Property"
              draggable={false}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />
          </Box>
        ))}
      </ReactSortable>
    </Box>
  );
};

export default MultiImageUpload;
