/*import {
  uploadFile,
  deleteFile,
  getPublicUrl,
  listFiles,
} from "../../services/storage"; // ajuste conforme seu projeto
import fs from "fs";
import path from "path";

async function testFileUpload() {
  const folder = "temp";
  const fileName = "next.svg";

  // Caminho absoluto do arquivo
  const absoluteFilePath = path.resolve(
    __dirname,
    "../../../../frontend/public",
    fileName,
  );

  // Ler arquivo como buffer
  const fileBuffer = fs.readFileSync(absoluteFilePath);

  console.log("⬆️ Uploading file...");
  const uploadResult = await uploadFile({
    folder,
    file: fileBuffer,
    fileName,
    // contentType pode ser detectado dentro do serviço, mas se quiser pode passar aqui:
    contentType: "image/svg+xml",
  });
  console.log("✅ Upload result:", uploadResult);

  if (!uploadResult.success) return;

  // Montar o caminho do arquivo no storage para pegar a URL pública
  const filePath = `${folder}/${uploadResult.data?.fileName}`;

  console.log("🔗 Getting public URL...");
  const url = getPublicUrl(filePath);
  console.log("📎 Public URL:", url);

  console.log("📂 Listing files in folder...");
  const listed = await listFiles(folder);
  console.log("📄 Files:", listed);

  // Se quiser, pode testar delete também:
  // console.log("🗑️ Deleting file...");
  // const deleted = await deleteFile(filePath);
  // console.log("✅ Delete result:", deleted);
}

testFileUpload().catch(console.error);

 */
