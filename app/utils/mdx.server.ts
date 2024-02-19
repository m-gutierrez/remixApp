import { bundleMDX } from "mdx-bundler";
import { readFile, get_post_path } from "utils/fs.server";
import path from "path";

import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeToc from "rehype-toc";
import rehypeMathJax from 'rehype-mathjax';

import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';


export async function getPost(slug: string) {
  const source = await readFile(
    get_post_path(slug+'.mdx'),"utf-8");

  const post = await bundleMDX({
    source,
    cwd: path.join(process.cwd(), 'app'),
    mdxOptions(options, frontmatter){
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
        remarkMath,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeToc,
        rehypeAutolinkHeadings,
        rehypeMathJax,
        [rehypeHighlight, {detect: true}],
      ];

      return options;
    },
  }).catch((error: unknown) => {
    console.error(error);
    throw error;
  });

  return post;
}




