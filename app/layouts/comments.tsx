import { NavLink, Form, useNavigation, useLocation} from "@remix-run/react";
import { useRef, useEffect } from 'react';
import { Stack } from "react-bootstrap";


export function Comment( { comment } ){
  // Render a single comment
  return (
     <Stack className="border rounded">
      <Stack direction="horizontal" gap={1}>
        <img src={comment.avatar} width="50" referrerPolicy="no-referrer"/>
        <h6> {comment.userName}</h6>
      </Stack>
      <Stack direction="horizontal">
        <div className="ms-0 me-auto">
        <small><small>
          <a href={comment.postSlug}>
            {comment.postName} 
          </a>
        </small></small>
        </div>
        <div className="ms-auto me-0">
        <small><small>
          {(new Date(comment.createdAt)).toLocaleString(
          'en-CA', { hour12: false, timezone: "UTC", 
          dateStyle: "short", timeStyle: "short"})}
        </small></small>
        </div>
      </Stack>
      <hr className="p-0 m-0"/>
        {comment.comment}
    </Stack>
  );
}

export default function Comments({ sidebar }){
  let comments = sidebar.comments;
  let user = sidebar.user;
  let navigation = useNavigation();
  let busy = navigation.state === "submitting";
  let buttonDisable = (busy || !user);
  let formRef = useRef();
  let matches = useLocation();

  useEffect(() => {
    if(!busy) {
      formRef.current?.reset();
    }
  },[busy])

  // Create comment fields
  let postName = sidebar.postName;
  let postSlug = sidebar.slug;
  let userName = user.displayName;
  let avatar = user.photos[0].value;

  return (
    <Stack className='p-0 mx-0 mt-1 text-break' gap={2}>
      <h3>Comments</h3>
      <Form ref={formRef} method="post" action={postSlug}>
        <input type="hidden" name="postName" value={postName} />
        <input type="hidden" name="postSlug" value={postSlug} />
        <input type="hidden" name="userName" value={userName} />
        <input type="hidden" name="avatar" value={avatar} />
        <Stack>
          <textarea rows={3} className="d-flex" type="text" name="comment"/>{" "}
          <button disabled={buttonDisable} type="submit">
            {!user ? ("Please log in...") : ("Submit")}</button>
        </Stack>
      </Form>
      {comments.map( (comment) => (
        <Comment comment={comment} key={comment.id}/>
      ) )}
    </Stack>
  );
}