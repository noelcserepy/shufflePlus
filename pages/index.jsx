import { Button } from "@mantine/core";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Editor from "../components/Editor";

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

export default function Home() {
	const { data: session, status } = useSession();

	if (!session) return <Button onClick={signIn}>Sign In</Button>;
	if (session) return <Editor />;
}
