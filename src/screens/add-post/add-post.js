import { useQueries, useQuery, useQueryClient,useMutation } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {todosApi, getTodo, postTodo, putTodo, delTodo } from "../../api/todosApi";
const AddPost =()=>{
    const [newPost, setNewPost]=useState("");
    const queryClient =useQueryClient();
    const titleRef =useRef();
    const bodyRef =useRef();
    let [post, setPost] = useState([])
    const {
        isLoading:loading,
        isError,
        data:posts
        } = useQuery(['posts'],getTodo)
    
    const addPostMutation=useMutation(postTodo,
    {
        onSuccess:()=>{
            queryClient.invalidateQueries(["posts"])
        }
    })

    const updateMutation = useMutation(putTodo, {
        onSuccess:()=>{
           queryClient.invalidateQueries(["posts"])
        }
    })
    const {data:updata,isLoading:uploading} = updateMutation;

    function updateClick(){
        updateMutation.mutate({
            id:1,
            title:"sherzod",
        })

    }


const delMutation = useMutation(delTodo, {
    onSuccess:()=>{
        queryClient.invalidateQueries(["posts"])
    }
})

const {data:delData} = delMutation;


 function delClick(){
delMutation.mutate({
    id:1,

})

 }
    const handleSubmit=(evt)=>{ 
        evt.preventDefault();
        const bodyValue=bodyRef.current.value;
        const titleValue = titleRef.current.value;

        addPostMutation.mutate({
        userId:1,
    
        title:titleValue,
        body:bodyValue
    })
    setNewPost("");
  
    }
   const {isLoading ,data ,isSuccess}=addPostMutation

useEffect(()=>{
if(isSuccess){
    setPost([
        data,
        ...posts
    ])
}
},[isSuccess]);

 
if(loading){
    return(
        <h1>Loading...</h1>
    )
}

    return(
        <>
        <form onSubmit={handleSubmit}>
          
            <div className="new-post">
                <input 
                type="text"
               ref={titleRef}
               required
                 />
            </div>
            <div className="new-post">
                <input 
                type="text"
                ref={bodyRef}
                required
                 />
            </div>
            <button>Submit</button>
        </form>
        <button onClick={updateClick}>Patch</button>
        <button onClick={delClick}>Delete</button>
        {posts.map(post=>(
            <div key={post.id} className="div">
            <Link  to={`/user/${post.id}`}>{post.title}</Link>
            </div>
        ))}

        </>
    )
}

export default AddPost