import { Header } from "@/components/header";
import { RoomComponent } from "@/components/room-component";
import Heart from "@/assets/heart.svg";
export default function Dashboard() {
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <main className="flex flex-col flex-grow overflow-hidden p-0 md:p-2 md:pt-0 w-full md:mx-auto">
        <Header />
        <RoomComponent />
      </main>
      <footer className="hidden md:flex md:items-center md:gap-2 md:justify-end font-mono uppercase text-right pt-1 pb-2 px-8 text-xs text-gray-600 w-full md:mx-auto">
        Built with
        <Heart />
        in
        <a
          href="https://github.com/livekit/agents"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Yokohama
        </a>{" "}
        • © 2024 Choimirai Company
      </footer>
    </div>
  );
}
