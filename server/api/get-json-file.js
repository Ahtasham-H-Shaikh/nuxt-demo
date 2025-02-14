import { readFile, access } from 'fs/promises';
import path from 'path';

const fileExists = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } catch (err) {
    return false;
  }
};

export default defineEventHandler(async (event) => {
  const { path: filePathParam } = getQuery(event);

  if (!filePathParam) {
    return { error: 'No path provided' };
  }

  const filePath = path.resolve(process.cwd(), `public/json/${filePathParam}`);

  const fileExistsFlag = await fileExists(filePath);
  
  if (!fileExistsFlag) {
    return { error: `File not found: ${filePath}` };
  }

  try {
    const fileContent = await readFile(filePath, 'utf-8');

    const data = JSON.parse(fileContent);

    return data;
  } catch (error) {
    return { error: `Error reading the file: ${error.message}` };
  }
});
