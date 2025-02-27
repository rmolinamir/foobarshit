"use client";

import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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
  const trpc = useTRPC();
  const getLatestQueryOptions = trpc.post.getLatest.queryOptions();
  const { refetch, isFetching } = useQuery(getLatestQueryOptions);
  const queryClient = useQueryClient();
  return (
    <Suspense fallback="Loading...">
      <Post />
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={isFetching}
        onClick={() => {
          queryClient.removeQueries(getLatestQueryOptions)
          void refetch()
        }}>
        Reset Latest Post
      </button>
    </Suspense>
  )
}
