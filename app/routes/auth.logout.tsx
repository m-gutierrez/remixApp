import { ActionArgs, redirect } from "@remix-run/node"
import { authenticator } from "utils/auth.server";

export let loader = () => redirect('/home');


export let action = async ({ request, params }: ActionArgs) => {
  await authenticator.logout(request, { redirectTo: "/" });
};