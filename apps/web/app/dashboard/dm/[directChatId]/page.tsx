import DMMessages from "../../../../components/dmComponent/DMMessages";
import DMInput from "../../../../components/dmComponent/DMInput";

export default async function DirectChatPage({
  params,
}: {
  params: { directChatId: string };
}) {
  const { directChatId } = await params;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <DMMessages directChatId={directChatId} />
      <DMInput directChatId={directChatId} />
    </div>
  );
}
