import { useQueries, useQuery, useQueryClient,useMutation } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {todosApi, getTodo, postTodo, putTodo, delTodo } from "../../api/todosApi";
const AddPost =()=>{
    const [fetch, setfetch]=useState(false);
    const queryClient =useQueryClient();
    const titleRef =useRef();
    const bodyRef =useRef();
    const [showposts , setShowposts]=useState([])
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
    
  
    }
   const {isLoading ,data ,isSuccess}=addPostMutation


// if(data && !isLoading){
//     posts.splice(0,0,data);
//     console.log(posts);
//     // setShowposts(posts)
//     // setfetch(true)
// }


useEffect(()=>{
if(isSuccess){
    posts.splice(100,0,data);
    setShowposts(posts);
    setfetch(true)
}
},[isSuccess]);

//  console.log(showposts);
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
        <button onClick={delClick}>Delete</button>
        { fetch? showposts.map(post=>(
            <div key={post.id} className="div">
            <Link  to={`/user/${post.id}`}>{post.title}</Link>
            </div>
        )) :posts.map(post=>(
            <div key={post.id} className="div">
            <Link  to={`/user/${post.id}`}>{post.title}</Link>
            </div>
        )) }

        </>
    )
}

export default AddPost