import { readFile, readdir } from "fs/promises";
export { readFile, readdir } 
import path from "path";
import parseFrontMatter from "front-matter";

export function get_post_path(post_slug : string){
  const post_path = path.join(
    process.cwd(), 'posts', (post_slug ? post_slug : ''));
  return post_path;
}

export async function ls_posts(){
  const filePath = get_post_path('');

  const post_paths = await readdir(filePath, {
    withFileTypes: true,
  });

  return post_paths
}

export async function get_frontmatter(post_path){
  const file = await readFile(post_path);
  const { attributes } = parseFrontMatter(file.toString());

  // check for requried fields or assign defaults
  attributes.title ??= "PLEASE ADD A TITLE";
  attributes.date ??= "1010-10-10";
  attributes.tags ??= ["untagged"];
  attributes.icon ??= "https://lh3.googleusercontent.com/pw/ABLVV8721vqwvEeiu-5WIyinQUSbO1QzJP2XlmDO2YcDQZ9hNW0fIW6GYxi1r8RG4KAi-EM-0vPQRcR07CshImZNOftitftjlfsE_-j37BkqaoWmSDN2QDvw3NjV_aImHYucgiOl0JXBp6SCr9hYidWl42z07Q=w1704-h1704";

  // replace image dimensions with width of 100px
  attributes.icon = attributes.icon.replace(/=w\d{1,5}-h\d{1,5}/, "=w100")
  // Convert date to date datestring
  attributes.date = (new Date(attributes.date)).toLocaleDateString(
              'en-CA', {dateStyle: "short"});

	return attributes;
}

export async function get_sorted_posts_meta() {
  // Get a list of meta data for posts, sorted by date
  const post_paths = await ls_posts();


  const posts = await Promise.all(
    post_paths.map( async (dirent) => {

    const post_path = path.join(dirent.path, dirent.name);

    const attributes = await get_frontmatter(post_path);//parseFrontMatter(file.toString());
    return {
      slug: path.parse(dirent.name).name,
      attributes: attributes,
      };
    })
  );

  return posts.sort(function(a,b){
    return (new Date(b.attributes.date) - new Date(a.attributes.date));
  });
}