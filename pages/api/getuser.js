import fs from 'fs'
import path from 'path'

const dbDir = path.join(process.cwd(), 'todo_db')


export default (request, response) => {
    console.log(response);
    if (request.method === 'POST') {

        const fullpath = path.join(process.cwd(), 'todo_db/' + request.body.userid + '.json');
        switch (request.body.action) {
            case "init": {
                let usersid=getAllUsersId();
                if(usersid.indexOf(request.body.userid)==-1){
                    fs.writeFileSync(fullpath,"{}");
                    console.log("user create");
                }
                sendFile(fullpath,response);
                break;
            }
            default: {
                sendFile(fullpath,response);
                break;
            }
        }
    }else{
        response.status(400).send("fail");
    }

}
function getAllUsersId(){
    
    //get file names
    const filenames=fs.readdirSync(dbDir)

    return filenames.map(filename=>parseInt(filename.replace(/\.json$/,'')))
}
function sendFile(filename,response){
    fs.readFile(filename, 'utf8', (error, data) => {
        if (error) {
            console.log('error');
            console.log(error);
            response.status(500).json({ error: 'server error' });
        }
        response.status(200).json(JSON.parse(data));
    })
}