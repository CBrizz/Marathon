import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTRPC } from "@/trpc/react";

export const Route = createFileRoute("/example/posts/")({
  component: PostsIndex,
});

function PostsIndex() {
  const trpc = useTRPC();
  const { data: posts, isLoading } = useQuery(trpc.posts.list.queryOptions());

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts with Drizzle ORM + tRPC
          </p>
        </div>
        <Button>New Post</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[180px]">Created</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : posts?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground text-center"
                >
                  No posts found. Create your first post to get started.
                </TableCell>
              </TableRow>
            ) : (
              posts?.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.id}</TableCell>
                  <TableCell>
                    <div className="max-w-[500px] truncate">{post.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        to="/example/posts/$postId"
                        params={{ postId: post.id.toString() }}
                      >
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
