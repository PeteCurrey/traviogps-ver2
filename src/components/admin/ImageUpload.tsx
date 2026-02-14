import { useState, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<Blob> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Draw image with white background (for transparency)
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not compress image"));
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => reject(new Error("Could not load image"));
    img.src = URL.createObjectURL(file);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket: string;
  folder?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export function ImageUpload({
  value,
  onChange,
  bucket,
  folder = "",
  className,
  aspectRatio = "video",
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (max 10MB before compression)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB");
        return;
      }

      setIsUploading(true);

      try {
        const originalSize = file.size;
        
        // Compress the image
        const compressedBlob = await compressImage(file, {
          maxWidth,
          maxHeight,
          quality,
        });
        
        const compressedSize = compressedBlob.size;
        const savings = Math.round((1 - compressedSize / originalSize) * 100);
        
        const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, compressedBlob, {
            contentType: "image/jpeg",
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        onChange(publicUrl);
        
        if (savings > 0) {
          toast.success(
            `Image uploaded (${formatFileSize(originalSize)} → ${formatFileSize(compressedSize)}, ${savings}% smaller)`
          );
        } else {
          toast.success("Image uploaded successfully");
        }
      } catch (error: any) {
        console.error("Upload error:", error);
        toast.error(error.message || "Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, maxWidth, maxHeight, quality, onChange]
  );

  const handleRemove = useCallback(() => {
    onChange("");
  }, [onChange]);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div className={cn("relative", className)}>
      {value ? (
        <div className={cn("relative rounded-lg overflow-hidden border border-border", aspectRatioClass)}>
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors",
            aspectRatioClass,
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleUpload}
            disabled={isUploading}
          />
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <>
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Click to upload</span>
            </>
          )}
        </label>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  bucket: string;
  folder?: string;
  maxImages?: number;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export function MultiImageUpload({
  value,
  onChange,
  bucket,
  folder = "",
  maxImages = 10,
  className,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const remainingSlots = maxImages - value.length;
      if (files.length > remainingSlots) {
        toast.error(`You can only upload ${remainingSlots} more image(s)`);
        return;
      }

      setIsUploading(true);

      try {
        let totalOriginalSize = 0;
        let totalCompressedSize = 0;

        const uploadPromises = files.map(async (file) => {
          if (!file.type.startsWith("image/")) {
            throw new Error("Please upload only image files");
          }

          if (file.size > 10 * 1024 * 1024) {
            throw new Error("Each image must be less than 10MB");
          }

          totalOriginalSize += file.size;

          // Compress the image
          const compressedBlob = await compressImage(file, {
            maxWidth,
            maxHeight,
            quality,
          });

          totalCompressedSize += compressedBlob.size;

          const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;

          const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(fileName, compressedBlob, {
              contentType: "image/jpeg",
            });

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

          return publicUrl;
        });

        const newUrls = await Promise.all(uploadPromises);
        onChange([...value, ...newUrls]);

        const savings = Math.round((1 - totalCompressedSize / totalOriginalSize) * 100);
        if (savings > 0) {
          toast.success(
            `${newUrls.length} image(s) uploaded (${formatFileSize(totalOriginalSize)} → ${formatFileSize(totalCompressedSize)}, ${savings}% smaller)`
          );
        } else {
          toast.success(`${newUrls.length} image(s) uploaded successfully`);
        }
      } catch (error: any) {
        console.error("Upload error:", error);
        toast.error(error.message || "Failed to upload images");
      } finally {
        setIsUploading(false);
      }
    },
    [bucket, folder, maxImages, maxWidth, maxHeight, quality, onChange, value]
  );

  const handleRemove = useCallback(
    (index: number) => {
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange(newValue);
    },
    [onChange, value]
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-border">
            <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {value.length < maxImages && (
          <label
            className={cn(
              "flex flex-col items-center justify-center gap-1 aspect-video rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 cursor-pointer hover:bg-muted/80 transition-colors",
              isUploading && "pointer-events-none opacity-50"
            )}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleUpload}
              disabled={isUploading}
            />
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            ) : (
              <>
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add images</span>
              </>
            )}
          </label>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {value.length} of {maxImages} images uploaded
      </p>
    </div>
  );
}
