"use server";
import * as Minio from "minio";
import sharp from "sharp";

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT!,
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
});

export const uploadFile = async (file: File) => {
  try {
    const bucketName = process.env.MINIO_BUCKET_NAME;
    if (!bucketName) {
      return { message: "Bucket name not found", status: 404, success: false };
    }

    // Ensure the bucket exists
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName);
    }

    // Convert image to PNG using sharp
    const imageBuffer = await file.arrayBuffer();
    const pngBuffer = await sharp(Buffer.from(imageBuffer)).png().toBuffer();

    // Generate a unique file name with PNG extension
    const fileName = `${Date.now()}-${file.name.split(".")[0]}.png`;

    // Upload converted PNG to MinIO
    await minioClient.putObject(
      bucketName,
      fileName,
      pngBuffer,
      pngBuffer.length,
      {
        "Content-Type": "image/png",
      },
    );

    // Construct the file URL
    const fileUrl = `http://${process.env.MINIO_ENDPOINT || "localhost"}:${process.env.MINIO_PORT || 9000}/${bucketName}/${fileName}`;

    return {
      message: "File converted to PNG and uploaded successfully",
      status: 200,
      success: true,
      fileUrl, // Return the final PNG file URL
    };
  } catch (error) {
    console.error("File upload failed:", error);
    return { message: "Upload failed", status: 500, success: false };
  }
};
