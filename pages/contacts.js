import useSWR from 'swr'
import {useState, useEffect} from 'react'

const fetcher=(url)=>fetch(url).then(res=>res.json())

export default function Contacts(){

    const {data,err} = useSWR('/api/hello',fetcher);
    
    if(err){
        return (
            <div>
                server error
            </div>
        )
    }
    if(!data){
        return (<div>
            loading...
        </div>)
    }else{
        let list=[];
        for(let key in data){
            list.push((<li key={key}>{key+": "+data[key]}</li>))
        }
        return (
            <section>
                <h2>Contacts</h2>
                <ul>
                    {list}
                </ul>
            </section>
        )
    }
}