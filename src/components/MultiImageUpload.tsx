import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactSortable } from "react-sortablejs";

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
  const [previews, setPreviews] = useState<{ id: string; src: string; file?: File }[]>([]);

  // Initialize previews
  useEffect(() => {
    const images: (File | string)[] = formik.values[fieldName] || [];
    const urls = images.map((img, idx) => ({
      id: idx + "-" + (img instanceof File ? img.name : img),
      src: typeof img === "string" ? img : URL.createObjectURL(img),
      file: img instanceof File ? img : undefined,
    }));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => {
        if (url.src.startsWith("blob:")) URL.revokeObjectURL(url.src);
      });
    };
  }, [formik.values[fieldName]]);

  // Remove image
  const handleRemove = (id: string) => {
    console.log(id);
    const index = previews.findIndex((p) => p.id === id);
    if (index === -1) return;

    const updatedImages = [...formik.values[fieldName]];
    updatedImages.splice(index, 1);
    formik.setFieldValue(fieldName, updatedImages);

    setPreviews((prev) => prev.filter((p) => p.id !== id));
  };

  // Add images
  const handleAdd = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    const currentImages: (File | string)[] = formik.values[fieldName] || [];
    if (currentImages.length + newFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }
    formik.setFieldValue(fieldName, [...currentImages, ...newFiles]);
  };

  // Handle sort update
  const handleSort = (newPreviews: typeof previews) => {
    setPreviews(newPreviews);
    const newImages = newPreviews.map((p) => (p.file ? p.file : p.src));
    formik.setFieldValue(fieldName, newImages);
  };


  return (
    <Box sx={{ gridColumn: "1 / -1" }}>
      {label && (
        <Typography variant="subtitle1" mb={1}>
          {label}
        </Typography>
      )}

      <Button variant="outlined" component="label">
        Upload Images
        <input
          hidden
          multiple
          accept="image/*"
          type="file"
          onChange={(e) => handleAdd(e.currentTarget.files)}
        />
      </Button>

      {/* Sortable Images */}
      <ReactSortable
        list={previews}
        setList={handleSort}
        animation={150}
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}
      >
        {previews.map((item) => (
          <Box
            key={item.id}
            sx={{
              position: "relative",
              width: 120,
              height: 120,
              borderRadius: 2,
              border: "1px solid #ddd",
              overflow: "hidden",
            }}
          >
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(255,255,255,0.8)",
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                zIndex: 10,
              }}
              onClick={() => handleRemove(item.id)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Box
              component="img"
              src={item.src}
              alt="Property"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ))}
      </ReactSortable>
    </Box>
  );
};

export default MultiImageUpload;
