import * as url from "url";
import download from "image-downloader";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const photoDownload = async (req, res) => {
  const imageName = `CS_at_${Date.now()}.jpg`;
  await download
    .image({
      url: req.body.photoLink,
      dest: path.join(`${__dirname}../uploads/${imageName}`),
    })
    .then(({ filename }) => {
      console.log("Saved to", filename);
    })
    .catch((err) => console.error(err));
  res.json({ imageName });
};

export default photoDownload;
