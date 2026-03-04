import DirectChatClient from "./DirectChatClient";

export default async function DirectChatPage({
  params,
}: {
  params: { directChatId: string };
}) {
  const { directChatId } = await params;

  return <DirectChatClient directChatId={directChatId} />;
}
