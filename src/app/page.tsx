import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import { LatestPost } from "./_components/latest-post";
import { CreatePost } from "./_components/create-post";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>
        <div className="w-full max-w-xs">
          <LatestPost />
          <CreatePost />
        </div>
      </main>
    </HydrateClient>
  );
}
