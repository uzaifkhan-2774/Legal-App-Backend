import multer from "multer";


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(file);
          cb(null, 'my-uploads')    // this is our destination path of the file folder where the incomming files will be store.
        },
        filename: function (req, file, cb) {
          const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          // console.log(file);  //it will generate the random number and data content to the prefix  of the filename.
          cb(null, uniquePrefix + '-' + file.fieldname)
          
        }
      })
      
      const upload = multer({
        storage,
        limits : {fileSize : 2 * 1024 * 1024}
      }
      );

      export default upload;


    //   const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //       cb(null, '/tmp/my-uploads')
    //     },
    //     filename: function (req, file, cb) {
    //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //       cb(null, file.fieldname + '-' + uniqueSuffix)
    //     }
    //   })
      
    //   const upload = multer({ storage: storage })