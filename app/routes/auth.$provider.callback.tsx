import { LoaderArgs } from "@remix-run/node"
import { authenticator } from 'utils/auth.server';
import { sessionStorage } from 'utils/session.server';

export let loader = async ({ request, params }: LoaderArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie'));
  let redirect_url = session.get('redirect_url');
  await sessionStorage.commitSession(session)
  return authenticator.authenticate(params.provider, request, {
    successRedirect: redirect_url,
    failureRedirect: '/denied',
  });

};