import { ActionArgs, redirect, defer } from "@remix-run/node"
import { authenticator } from 'utils/auth.server';
import { sessionStorage } from 'utils/session.server';


export let action = async ({ request, params }: ActionArgs) => {
  let ref_url = request.headers.get('referer');
  let session = await sessionStorage.getSession(
      request.headers.get('Cookie'));
  session.flash('redirect_url', ref_url);
  let headers = new Headers(
    { "Set-Cookie": await sessionStorage.commitSession(session)});
  return redirect(`/auth/${params.provider}`, {headers: headers});
}

export let loader = ({ request, params }: ActionArgs) => {
  return authenticator.authenticate(params.provider, request); 
}