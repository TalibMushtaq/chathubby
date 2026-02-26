import DMHeader from "../../../components/dmComponent/DMHeader";
import DMMessages from "../../../components/dmComponent/DMMessages";
import DMInput from "../../../components/dmComponent/DMInput";
export default function DirectChatPage({
  params,
}: {
  params: { directChatId: string };
}) {
  const { directChatId } = params;

  return (
    <div className="flex h-screen flex-col bg-bg text-white">
      <DMHeader directChatId={directChatId} />
      <DMMessages directChatId={directChatId} />
      <DMInput directChatId={directChatId} />
    </div>
  );
}
