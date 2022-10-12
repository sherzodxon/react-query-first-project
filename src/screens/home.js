import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"

export const Home=()=>{
    const {data,isLoading}=useQuery(['users'],()=>{
    return axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>res.data)
  })

  if(isLoading){
    return(
        <h1>Loading...</h1>
    )
  }
    return(
    <>
    <h1>Home</h1>
    {data.map(data=>( 
         <p key={data.id}>{data.name}</p>
    ))}
    <Link to={"/id"} children="ID" />
    <div>
    <Link to={"/new-post"} children="Add-post"/>
    </div>
    </>
        
    )
}