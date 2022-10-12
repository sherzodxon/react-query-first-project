import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import {
    useEffect,
    useRef,
    useState
} from "react";
import {
    useParams
} from "react-router"
import {
    getTodo,
    putTodo
} from "../../api/todosApi";

const User = () => {
    const {
        id
    } = useParams();
    let [postData, setPosts] = useState([]);
    let [fetched, setFetched] = useState(false);
    let [patch, setPatch] = useState(false);
    let editpost = [];
    const titleRef =useRef();
    const bodyRef =useRef();
   

    const queryClient = useQueryClient();

    const updateMutation = useMutation(putTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
        }
    })
    const {
        data: updata,
        isLoading: uploading,
        isFetching : upfetching,
        isSuccess:upsuccess
    } = updateMutation;

    

    const {
        data: posts,
        isLoading,
        isSuccess,
        isFetching
    } = useQuery(['posts'], getTodo);

     if(!isLoading){
    editpost = posts.slice()
   
     }
     function updateClick(evt) {

        evt.preventDefault();
        const bodyValue=bodyRef.current.value;
        const titleValue = titleRef.current.value;

        updateMutation.mutate({
            id: +id,
            title: titleValue,
            body: bodyValue
        })
        if(upsuccess){
            const index = editpost.findIndex(post => post.id === +id);
            editpost.splice(index,1,updata);
            setPosts(editpost);
            setFetched(true)
        }
        evt.target.reset();
     
    }
    
  
    if (fetched) {
       
        const post = postData.find(post => post.id == id);
        return(
           <div className="div">
            <form onSubmit={updateClick}>
          
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
            <h3>title : {post.title}</h3>
           
            </div>
        )
    }
     else if (!isLoading) {
    
         const post = editpost.find(post => post.id == id);
         return(
            <div className="div">
                 <form onSubmit={updateClick}>
          
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
             <h3>title : {post.title}</h3>
             
             </div>
         )
     }
}
export default User