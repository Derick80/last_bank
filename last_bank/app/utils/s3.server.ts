import type { UploadHandler } from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import S3 from "aws-sdk/clients/s3";
import cuid from "cuid";

const s3 = new S3({
  region: process.env.BUCKET_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
// app/utils/s3.server.ts

const uploadHandler: UploadHandler = async ({ name, filename, stream }) => {
  // 2
  if (name !== "profile-pic") {
    stream.resume();
    return;
  }

  // 3
  const { Location } = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME || "",
      Key: `${cuid()}.${filename.split(".").slice(-1)}`,
      Body: stream,
    })
    .promise();

  // 4
  return Location;
};

export async function uploadAvatar(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const file = formData.get("profile-pic")?.toString() || "";

  return file;
}
