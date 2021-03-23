import fs from 'fs'
import path from 'path'

export default (req, res) => {
  
  let directory=path.join(process.cwd(),'db');
  const fullpath=path.join(directory,'contacts.json');
  
  fs.readFile(fullpath,"utf8",(err,data)=>{
    if(err){
      console.log("error");
      res.send('not found');
    }else{
      res.status(200).send(data);
    }
  })
}
