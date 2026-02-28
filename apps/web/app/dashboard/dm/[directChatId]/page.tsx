import DMMessages from "../../../../components/dmComponent/DMMessages";
import DMInput from "../../../../components/dmComponent/DMInput";

export default async function DirectChatPage({
  params,
}: {
  params: { directChatId: string };
}) {
  const { directChatId } = await params;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <DMMessages directChatId={directChatId} />
      <DMInput directChatId={directChatId} />
    </div>
  );
}
