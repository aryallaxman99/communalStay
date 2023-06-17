import * as url from "url";
import download from "image-downloader";
import path from "path";
import fs from "fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const uploadPhotoViaLink = async (req, res) => {
  try {
    const imageName = `CS_at_${Date.now()}.jpg`;
    await download.image({
      url: req.body.photoLink,
      dest: path.join(`${__dirname}../uploads/${imageName}`),
    });
    res.json({ imageName });
  } catch (error) {
    res.json({
      msg: "Something went Wrong",
      type: "error",
      status: false,
    });
  }
};

const uploadPhoto = (req, res) => {
  try {
    const { path, mimetype, filename } = req.files[0];
    fs.renameSync(path, `${path}.${mimetype.split("/")[1]}`);
    res.json({ imageName: `${filename}.${mimetype.split("/")[1]}` });
  } catch (error) {
    res.json({
      msg: "Something went Wrong",
      type: "error",
      status: false,
    });
  }
};
export default { uploadPhotoViaLink, uploadPhoto };
