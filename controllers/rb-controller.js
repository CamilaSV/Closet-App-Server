import { exec } from "child_process";
import sharp from "sharp";
import fs from "fs";

const removeBackground = async (file) => {
  try {
    const filePath = `./${file.path}`;
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
    const response = await exec(
      `python3.10 remove_bg.py ${pngPath} ${pngPath}`,
      () => {
        return pngPath.slice(1);
      }
    );

    return response.spawnargs[2].split(" ")[3].slice(1);
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export default removeBackground;
