import type { MetaFunction } from "@remix-run/node";
import {  useLoaderData, LoaderFunction } from "@remix-run/react";
import { useMemo } from 'react';
import Page from 'layouts/page';

import { getPost } from "utils/mdx.server";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import { ClientOnly } from "remix-utils/client-only";


export const meta: MetaFunction = ({params}) => {
  return [
    { title: params.postname },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.post;

  const post = await getPost(slug);
  if (post){
    const { frontmatter, code } = post;
    return { frontmatter, code };
  } else {
    throw new Response("Not Found", { status: 404 });
  }
}


export default function Blog() {
  const { frontmatter, code } = useLoaderData();
  const Content = useMemo(() => getMDXComponent(code), [code]);

  return (
      <Page 
        sidebar={<>SIDEBAR!!</>} 
        main={    
          <>
            <h1 className="display-3 row justify-content-center">
              {frontmatter.title}
            </h1>
            <ClientOnly>
             {() =>  <Content/> }
            </ClientOnly>
          </>
        }
      />
  );
}
