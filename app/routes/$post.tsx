import { json, Link, useLoaderData, LoaderFunction, useLocation } from "@remix-run/react";
import { useMemo } from 'react';
import type { MetaFunction } from "@remix-run/node";
import Page from 'layouts/page';
import Comments from 'layouts/comments';

import { getPost } from "utils/mdx.server";
import { authenticator } from "utils/auth.server";

import { getMDXComponent } from "mdx-bundler/client/index.js";

import prisma from "utils/db.server";
import { ClientOnly } from "remix-utils/client-only";


export const meta: MetaFunction = ({params}) => {
  return [
    { title: params.post },
    { name: "description", content: "Blog post" },
  ];
};

export async function action( { params, request }: ActionArgs) {
  let user = await authenticator.isAuthenticated(request,{});
  let formData = await request.formData();
  let values = Object.fromEntries(formData);
  if (!values.comment) {
    return null
  };

  const comment = await prisma.comment.create({
    data:{
      userName: values.userName,
      avatar: values.avatar,
      postName: values.postName,
      postSlug: values.postSlug,
      comment: values.comment
  }
  });
  return null;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.post;
  if (!slug) throw new Response("Not found", { status: 404 });

  const comments = await prisma.comment.findMany({
    where: {postSlug: '/'+slug},
  })

  let user = await authenticator.isAuthenticated(request, {});

  const post = await getPost(slug);
  if (post){
    const { frontmatter, code } = post;
    return json({ frontmatter, code, comments, user });
  } else {
    throw new Response("Not Found", { status: 404 });
  }
}


export default function Blog() {
  const { frontmatter, code, comments, user } = useLoaderData<Post>();
  const location = useLocation();
  const Content = useMemo(() => getMDXComponent(code), [code]);
  const sidebar = {
    slug: location.pathname,
    postName: frontmatter.title,
    user: user,
    comments: comments
  }
  return (
      <Page 
        sidebar={<Comments sidebar={sidebar}/>} 
        user={user}
        main={    
          <>
            <h1 className="display-3 row justify-content-center">{frontmatter.title}</h1>
            <ClientOnly>
             {() =>  <Content/> }
            </ClientOnly>
          </>
        }
      />
  );
}
