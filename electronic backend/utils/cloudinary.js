import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "db4yerdo5",
  api_key: "668556782765693",
  api_secret: "o25wI5q2seg00Xolb9gQChUT7PM",
});

const cloudinaryUploading = async (fileToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileToUpload, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
            // Puedes incluir otras propiedades aquí si es necesario
          },
          {
            resource_type: "auto",
          }
        );
      }
    });
  });
};

const cloudinaryDeleting = async (fileToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileToUpload, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
            // Puedes incluir otras propiedades aquí si es necesario
          },
          {
            resource_type: "auto",
          }
        );
      }
    });
  });
};

export { cloudinaryUploading, cloudinaryDeleting };
