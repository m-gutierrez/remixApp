import type { MetaFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { LoaderArgs } from "@remix-run/node"
import { Calendar} from 'react-bootstrap-icons';
import { Stack, Container, Nav} from "react-bootstrap";

import Page from "layouts/page";
import { get_sorted_posts_meta } from "utils/fs.server";
import { authenticator } from "utils/auth.server";


export const meta: MetaFunction = () => {
  return [
    { title: "MG" },
    { name: "description", content: "Home" },
  ];
};

export let loader = async ( {request, params}: LoaderArgs) => {
  const [posts, user] = await Promise.all(
    [get_sorted_posts_meta(), authenticator.isAuthenticated(request,{})]);
  return { posts, user };
};


export function Main({ posts }) {
  return (
    <>
      <Stack gap={3} className="mt-1">
        { posts.map( (post) => (
            <FeedItem key={post.slug} post={post}/>
          ))
        }
      </Stack>
    </>
  );
}

export function FeedItem({ post }) {
  return (
    <Container className="px-0 border border-dark rounded pt-1">
      <Nav.Link 
        as={NavLink} to={post.slug} 
      className="text-primary fs-3 mb-1">
        <img className="mx-2 rounded" 
          src={post.attributes.icon} 
          referrerPolicy="no-referrer"/>
        {post.attributes.title}
      </Nav.Link>
      <hr className="my-0"/>
      <Stack direction="horizontal">
        <div className="text-start ms-1">
          {post.attributes.tags.map( (tag) => (
            <span key={post.slug+tag}>
              <small><small>{tag} </small></small>
            </span>
            ))}
        </div>
        <div className="ms-auto me-1 small">
          <small><small key={post.slug+'date2'}> <Calendar/> {post.attributes.date}</small></small>
        </div>
      </Stack>
    </Container>
  );
}

export default function Home() {
  const { posts, user } = useLoaderData();
  return (
    <Page 
      sidebar={false} 
      user={user} 
      main={<Main posts={posts}/>}
    />
  );
}


