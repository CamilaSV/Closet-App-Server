import { exec } from "child_process";
import sharp from "sharp";
import fs from "fs";

const removeBackground = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please provide an image for the item.",
    });
  }

  try {
    const filePath = `./${req.file.path}`;
    const pngPath = `.${filePath.split(".")[1]}.png`;
    const data = await sharp(filePath).toFile(pngPath);

    if (data) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting image file: ${err.message}`);
        }
      });
    }

    // use python3.10 and install rembg
    exec(`python3.10 remove_bg.py ${pngPath} ${pngPath}`, () => {
      res.status(200).json({
        message: "Background removed successfully",
        output: pngPath.slice(1),
      });
    });
  } catch (error) {
    console.error(error.message);
  }
};

export { removeBackground };
