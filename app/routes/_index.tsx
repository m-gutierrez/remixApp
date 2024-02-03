import type { MetaFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { Stack, Container, Nav} from "react-bootstrap";

import Page from "layouts/page";
import { get_sorted_posts_meta } from "utils/fs.server";


export const meta: MetaFunction = () => {
  return [
    { title: "Remix" },
    { name: "description", content: "Feed" },
  ];
};

export let loader = async () => {
  const posts = await get_sorted_posts_meta();
  return posts ;
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
    <Container key={post.slug} 
      className="px-0 border border-dark rounded pt-1">
      <Nav.Link as={NavLink} to={post.slug} 
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
            <small key={tag}><small>{tag} </small></small>
            ))}
        </div>
        <div className="ms-auto me-1 small">
          <small><small> {post.attributes.date}</small></small>
        </div>
      </Stack>
    </Container>
  );
}

export default function Home() {
  const posts = useLoaderData();
  return (
    <Page 
      sidebar={<>SIDEBAR!!!!</>} 
      main={<Main posts={posts}/>}
    />
  );
}


