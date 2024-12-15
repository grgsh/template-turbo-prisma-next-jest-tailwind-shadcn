import fs from "fs/promises";
import path from "path";

// Specify the input and output directories
const inputDirPath = path.join(process.cwd(), ".shadcn-ui"); // Change this to your input directory
const outputDirPath = path.join(process.cwd(), "src"); // Change this to your output directory

// Function to correct import statements in a file
async function correctImports(filePath, outputFilePath) {
  try {
    // Read the file content
    const data = await fs.readFile(filePath, "utf8");

    // Correct the import statements
    const correctedContent = data
      .split("\n")
      .map((line) => {
        if (line.includes("import") && line.includes("#/")) {
          return line.replace("#/", "#");
        }
        return line;
      })
      .join("\n");

    // Check if the output file already exists
    try {
      await fs.access(outputFilePath); // Check if the file exists
      console.log(`File already exists, skipping: ${outputFilePath}`);
      return; // Skip writing if the file already exists
    } catch {
      // If the file does not exist, proceed to write
      await fs.writeFile(outputFilePath, correctedContent, "utf8");
      console.log(`Corrected file saved: ${outputFilePath}`);
    }
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

// Function to traverse directories recursively
async function traverseDirectory(currentPath, relativePath) {
  try {
    const files = await fs.readdir(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        // If it's a directory, traverse it
        await traverseDirectory(filePath, path.join(relativePath, file));
      } else if (
        stat.isFile() &&
        (file.endsWith(".ts") || file.endsWith(".tsx"))
      ) {
        // If it's a .ts or .tsx file, correct it and save it to the output directory
        const outputFilePath = path.join(outputDirPath, relativePath, file);
        // Ensure the output directory exists
        await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
        await correctImports(filePath, outputFilePath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${currentPath}:`, err);
  }
}

console.log(inputDirPath);
// Start traversing from the input directory
traverseDirectory(inputDirPath, "");
