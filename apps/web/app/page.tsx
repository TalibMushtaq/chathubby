
import Button from "@repo/ui/Button";
export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline ">Hello world!</h1>
        <Button size={"lg"}>Hello world!</Button>
        <Button
          variant={"outline"}
          size={"lg"}
        >
          Hello world!
        </Button>
      </div>
    </>
  );
}
