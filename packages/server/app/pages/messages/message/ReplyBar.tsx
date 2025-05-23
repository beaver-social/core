import ReplyBarContent from "./ReplyBarContent";

type Props = {};

export default function ReplyBar({}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/50 glass border-t sm:hidden">
      <nav className="flex items-center w-full h-16">
        <ReplyBarContent />
      </nav>
    </div>
  );
}
