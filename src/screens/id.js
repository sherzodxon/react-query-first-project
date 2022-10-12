import { useQueries, useQuery, useQueryClient,useMutation } from "@tanstack/react-query"
import {todosApi, getTodo, postTodo, putTodo, delTodo } from "../api/todosApi";

const Id =()=>{
  const queryClient =useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data:posts
    } =useQuery(['posts'],getTodo)

    
    
    const putPostMutation=useMutation(putTodo,{
        onSuccess:()=>{
            queryClient.invalidateQueries("posts")
        }
    })
    
    const deletePostMutation=useMutation(delTodo,{
        onSuccess:()=>{
            queryClient.invalidateQueries("posts")
        }
    })

    if(isLoading){
    return(
        <h1>Loading...</h1>
    )
    }
    else if(isError){
        return (
            <h1>{`Error :(`}</h1>
        )
    }
    return(
        <>
        <h1>ID</h1>
        {posts.map(post=>(
            <p key={post.id} children={`${post.id})  ${post.title} :)`}></p>
        ))}
        </>
    )
}
export default Id;