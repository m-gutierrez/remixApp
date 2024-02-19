import type { MetaFunction } from "@remix-run/node";
import Page from "layouts/page";

export const meta: MetaFunction = () => {
  return [
    { title: "DENIED" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export default function Index() {


  return (
    <Page main={
      <h1 class="row justify-content-center"> DENIED </h1>
    }
    />
  );
}
