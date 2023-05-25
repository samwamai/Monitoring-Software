const fs = require('fs-extra');


const MAX_FILE_SIZE = 200 * 1024 * 1024; //200mb
const ALLOWED_EXTENSIONS = ['.mp3', '.mp4', '.jpeg', '.png'];


const ifAllowedExtension = (file)=>{
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    return ALLOWED_EXTENSIONS.includes(extension);
}
const ifAllowedSize = (file)=>{
    return file.size > MAX_FILE_SIZE;
}


const insertFile = async function (user_id,device_id,file) {
    const result = {boolean:false,message:'unable to upload file'};
    const uploadPath = __dirname + `/uploads/${user_id}/${device_id}`;
    try {
        // Create the directory if it doesn't exist
        await fs.ensureDir(uploadPath);
        await file.mv(uploadPath + file.name);
        result.boolean=true;result.message='File uploaded!';
        return result;
      } catch (err) {
        return result;
      }
  };


 // DELETE FUCTION FOR NEW QUERIES REUSABLE FUNCTION SINCE EVERY ITEM HAS ID 
const deleteFile = async function (tablename, id) {
    let queryString = await pool.query(`DELETE FROM ${tablename} WHERE id=$1`,[id]);
    try {
      const result = await pool.query(queryString, values);
      return result.rows;
    } catch (e) {
      return null;
    }
  }; 

 

module.exports.createTables = createTables;
