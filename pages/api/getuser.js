import fs from 'fs'
import path from 'path'

const dbDir = path.join(process.cwd(), 'todo_db');
if(fs.existsSync(dbDir)===false){
    fs.mkdirSync(dbDir);
}


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
            case "add":{

                console.log("adding");
                let date=new Date();
                let item={
                    completed: false,
                    task: request.body.content,
                    date: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
                }
                fs.readFile(fullpath,"utf8",(err,data)=>{
                    if(err){
                        console.log("error");
                        return;
                    }
                    let json = JSON.parse(data);
                    let lastindex=-1;
                    for(let i in json){
                        lastindex=parseInt(i);
                    }
                    item.id=lastindex+1;
                    json[lastindex+1]=item;
                    fs.writeFile(fullpath,JSON.stringify(json),(err)=>{
                        if(err)
                            console.log("error");
                    });
                    response.status(200).json({date: item.date,id:item.id});
                })
                break;
            }
            case "complete":{
                console.log("copleted");
                fs.readFile(fullpath,"utf8",(err,data)=>{

                    if(err) {
                        console.log(err);
                        return;
                    }
                    let json = JSON.parse(data);
                    let index = findIndex(json,request.body.taskid);
                    
                    json[index].completed=true;
                    fs.writeFile(fullpath,JSON.stringify(json),(err)=>{
                        if(err)
                            console.log("error");
                    });
                })
                response.status(200).send("completed")
                break;
            }
            case "delete":{
                console.log("delete");
                fs.readFile(fullpath,"utf8",(err,data)=>{

                    if(err) {
                        console.log(err);
                        return;
                    }
                    let json = JSON.parse(data);
                    let index=findIndex(json,request.body.taskid);
                    delete json[index];
                    fs.writeFile(fullpath,JSON.stringify(json),(err)=>{
                        if(err)
                            console.log("error");
                    });
                })
                response.status(200).send("completed")
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
//ищет индлекс по id задачи
function findIndex(json,id){
    for(let key in json){
        if(json[key].id===id){
            return key;
        }
    }
}