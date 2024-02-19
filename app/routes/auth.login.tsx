import type { MetaFunction } from "@remix-run/node";
import { Container, Stack, Modal} from 'react-bootstrap';

import { Form } from "@remix-run/react"
import { SocialsProvider } from 'remix-auth-socials';

import google_icon from 'icons/google.svg';
import github_icon from 'icons/github.svg';
import facebook_icon from 'icons/facebook.svg';
import discord_icon from 'icons/discord.svg';
import Page from "layouts/page";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Remix!" },

  ];
};

const GoogleButton = ({ provider, label }) => (
  <Form action={`/auth/${provider}`} method="post">
    <button className="btn fs-1"><img src={google_icon} width="50px"/>{label}</button>
  </Form>
);

const GithubButton = ({ provider, label }) => (
  <Form action={`/auth/${provider}`} method="post">
    <button className="btn fs-1"><img src={github_icon}width="50px"/>{label}</button>
  </Form>
);

const FacebookButton = ({ provider, label }) => (
  <Form action={`/auth/${provider}`} method="post">
    <button className="btn fs-1"><img src={facebook_icon}width="50px"/>{label}</button>
  </Form>
);

const DiscordButton = ({ provider, label }) => (
  <Form action={`/auth/${provider}`} method="post">
      <button className="btn fs-1">
      <img src={discord_icon}width="50px"/>{label}
    </button>
  </Form>
);


export function LoginBody(){
  return (
    <Container>
      <Stack>
        <Stack direction="horizontal" className="col justify-content-center align-items-center">
          <DiscordButton provider={SocialsProvider.DISCORD} label="" />
          <GithubButton provider={SocialsProvider.GITHUB} label="" />
        </Stack>
        <Stack direction="horizontal" className="col justify-content-center align-items-center">
          <GoogleButton provider={SocialsProvider.GOOGLE} label="" />
          <FacebookButton provider={SocialsProvider.FACEBOOK} label="" />
        </Stack>
      </Stack>
    </Container>
  );
}

export default function Login() {
  return (
    <Page main={
      <LoginBody/>
    }
    />
    )
}

export function LoginModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Log in: 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginBody/>
        </Modal.Body>
      </Modal>
    </>
  );
}
