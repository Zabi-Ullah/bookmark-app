import * as React from "react"
import { useQuery,useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import * as styles from './index.module.css'

const GETBOOKMARK=gql`
{
  bookmarks{
    id
    title
    url
   }
}
`
const SETBOOKMARK=gql`
  mutation addBookmark($title:String!,$url:String!){
    addBookmark(title:$title,url:$url){
      id
    }
  }
`
const IndexPage=()=>{
  const {loading,error,data}=useQuery(GETBOOKMARK)
  const [addBookmark]=useMutation(SETBOOKMARK)
  let title=""
  let url=""
  const addSubmit=()=>{
    console.log(title)
    if(title.value!="" && url.value!=""){
      addBookmark({
        variables:{
          title:title.value,
          url:url.value
        }
      })
    }
    title.value=""
    url.value=""
  }
  if(loading){
    return(
      <div className={styles.container}>
        <h1>loading...</h1>
      </div>
    )
  }
  if(error){
    return(
      <div className={styles.container}>
        <h1>Connection not build</h1>
      </div>
    )
  }
  return(
    <div className={styles.container}>
      <h1>Add Bookmark</h1>
      <label>Title :: </label>
      <input type="text" ref={e=>title=e} /><br />
      <label>URL :: </label>
      <input type="text" ref={e=>url=e} /><br />
      <button onClick={()=>addSubmit()}>Submit</button><br />
      <h1>Bookmark</h1>
      <table border={1} width="500">
        <tr>
          <th>Title</th>
          <th>URL</th>
        </tr>
        {data.bookmarks.map(d=>(
          <tr>
            <td>{d.title}</td>
            <td>{d.url}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default IndexPage
