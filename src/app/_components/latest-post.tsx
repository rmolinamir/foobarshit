"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useTRPC } from "~/trpc/react";

function Post() {
  const trpc = useTRPC();
  const { data: latestPost, isFetching } = useSuspenseQuery(trpc.post.getLatest.queryOptions());

  return (
    latestPost ? (
      <p className="truncate">
        Your most recent post: {latestPost.name}
        <br/>
        Is fetching? {isFetching ? 'Yes' : 'No'}
      </p>
    ) : (
      <p>You have no posts yet.</p>
    )
  );
}

export function LatestPost() {
  return (
    <Suspense fallback="Loading...">
      <Post />
    </Suspense>
  )
}
