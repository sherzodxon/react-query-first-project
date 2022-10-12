import axios from "axios";

const todosApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getTodo = async () => {
  const response = await todosApi.get(`/posts`);
  return response.data
}
export const postTodo = async (post) => {
  const response = await todosApi.post(`/posts`, post)
  return response.data 
}
export const putTodo = async (post) =>{
  const response = await todosApi.patch(`/posts/${post.id}` ,post);
  return response.data
}
export const delTodo = async ({id}) =>{
  const response = await todosApi.delete(`/posts/${id}`,id);
  return response.data
}




export default todosApi;