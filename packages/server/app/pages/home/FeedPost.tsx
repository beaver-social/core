import { Link, useNavigate } from "react-router";
import { Image } from "@/shared/components/Image";
import Reactions from "@/shared/components/Reactions";
import { motion } from "framer-motion";
import { truncateText } from "@/shared/lib/utils";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { useBeaver } from "@beaver/react";
import moment from "moment";
import MediaCarousel from "@/shared/components/MediaCarousel";

const schema = {
  "post": {
    "id": 9,
    "authorId": 2,
    "content": "asfqwqt",
    "nsfw": false,
    "suiAddress": null,
    "location": null,
    "parentId": null,
    "reposting": null,
    "viewCount": 0,
    "likesCount": 0,
    "repliesCount": 0,
    "repostsCount": 0,
    "sharesCount": 0,
    "actionId": 10,
    "subscriberOnly": false,
    "createdAt": 1747260798296,
    "deletedAt": null,
    "mentions": {
      "data": [
        {
          "userId": 2,
          "username": "ishtails",
          "fullName": "kartik",
          "imageUrl": null
        }
      ],
      "error": null
    },
    "media": {
      "data": [
        {
          "id": 1,
          "postId": 9,
          "url": "https://picsum.photos/200/300",
          "blurhash": null,
          "aspectRatio": "square",
          "type": "image"
        }
      ],
      "error": null
    }
  },
  "author": {
    "id": 2,
    "address": "0xf0efcd7dd2fbacb23f861fa11de038a9891f6087acf140ecbe0d0a2132ae23f0",
    "identity": "0xcba30e4e8e04b56c0e365c8d79c0909a1fd028583a1ba75b0d19668eaefe040f",
    "collectionNft": "0x31d856dca7a6210c797dc842848003a09a13095335a00b2c38b0c312b60374e8",
    "username": "ishtails",
    "about": null,
    "fullName": "kartik",
    "suinsDomainName": null,
    "location": null,
    "birthday": null,
    "twitter": null,
    "youtube": null,
    "instagram": null,
    "website": null,
    "pinnedPost": null,
    "imageUrl": null,
    "bannerUrl": null,
    "imageBlurhash": null,
    "timezone": null,
    "createdAt": 1747071796060,
    "deletedAt": null
  }
}

function FeedPost({
  postId
}: {
  postId: number;
}) {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [reply, setReply] = useState("");

  const beaver = useBeaver();
  const { data: post, isLoading: postLoading, isError: postError, isSuccess: postSuccess, refetch: refetchPost } = beaver.post.getPostById({ id: postId });
  const { data: author, isLoading: userLoading, isError: userError, isSuccess: userSuccess } = beaver.profile.getProfileById({ id: post?.authorId });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-6 pb-6"
    >
      {post?.media && post?.media.length > 0 ? (
        <motion.article
          className="flex flex-col rounded-sm transition-all duration-300 mx-6 sm:mx-0"
          whileTap={{ scale: 0.99 }}
        >
          {/* Header with Avatar */}
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to={`/profile/${author?.username}`} onClick={(e) => e.stopPropagation()}>
                <Image
                  src={author?.imageUrl}
                  alt={author?.username}
                  className="size-8 rounded-full border-2 border-primary/20"
                />
              </Link>
            </motion.div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 flex-wrap">
                <Link
                  to={`/profile/${author?.id}`}
                  className="font-semibold hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {author?.username}
                </Link>
                <span className="text-muted-foreground text-sm">@{author?.username}</span>
                <span className="text-muted-foreground mx-1">·</span>
                <time className="text-muted-foreground text-sm hover:underline">{moment(post?.createdAt).format("MMM D, YYYY")}</time>
              </div>
              {post?.location && (
                <div className="flex items-center gap-1 text-muted-foreground ">
                  <span className="text-xs">{post?.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Images if present */}
          {post?.media && post?.media.length > 0 && (
            <div
              className="w-full rounded-sm overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MediaCarousel media={post?.media} />
            </div>
          )}

          {/* Post Actions */}
          <div className="mt-2">
            <motion.div
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <Reactions postId={postId} analytics={post?.analytics} refetchPost={refetchPost} />
            </motion.div>
          </div>

          {/* Post Content */}
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-semibold">{author?.username} </span>
              <span>{showMore ? post?.content : truncateText(post?.content, 50)} </span>
              {post?.content.length > 50 && (
                <span>
                  <button className="text-muted-foreground text-sm hover:text-primary transition-colors" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "See less" : "more"}
                  </button>
                </span>
              )}
            </p>
          </div>

          {/* View / Post Comments */}
          <div className="mt-3">
            {/* {topReply && (
              <button onClick={() => {
                navigate(`/post/${postId}/replies/${topReply.id}`, { state: { postId: postId } });
              }} className="text-sm text-muted-foreground">
                <span className="font-semibold">{topReply.handle}</span> {truncateText(topReply.content, 50)}
              </button>
            )} */}
            <br />
            <button onClick={() => {
              navigate(`/post/${postId}`, { state: { postId: postId } });
            }
            } className="text-sm hover:text-primary transition-colors text-muted-foreground">
              View all {post?.analytics.comments} replies
            </button>

            {/* add a comment box */}
            <form onSubmit={(e) => {
              e.preventDefault();
            }} className="mt-2 relative">
              <Input placeholder="Reply to post" value={reply} onChange={(e) => setReply(e.target.value)} />
              {reply.length > 0 && (
                <Button variant="ghost" className="absolute right-0 top-0 hover:bg-transparent hover:text-primary">
                  <Icon name="SendHorizontal" className="size-4" />
                </Button>
              )}
            </form>

          </div>
        </motion.article>
      ) : (
        <motion.article
          className="flex flex-col rounded-sm overflow-hidden bg-secondary shadow-sm hover:shadow-md transition-all duration-300 border mx-6 sm:mx-0 cursor-pointer"
          whileTap={{ scale: 0.99 }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/post/${postId}`, { state: { postId } });
          }}
        >
          {/* Header with Avatar */}
          <div className="flex items-center gap-3 p-4 pb-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <Link to={`/profile/${author?.username}`} onClick={(e) => e.stopPropagation()}>
                <Image
                  src={author?.imageUrl}
                  alt={author?.username}
                  className="size-8 rounded-full border-2 border-primary/20"
                />
              </Link>
            </motion.div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 flex-wrap">
                <Link
                  to={`/profile/${author?.username}`}
                  className="font-semibold hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {author?.username}
                </Link>
                <span className="text-muted-foreground text-sm">@{author?.username}</span>
                <span className="text-muted-foreground mx-1">·</span>
                <time className="text-muted-foreground text-sm hover:underline">{moment(post?.createdAt).format("MMM D, YYYY")}</time>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pt-1 pb-3">
            <p className="text-sm">{post?.content}</p>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-border">
            <motion.div
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Reactions postId={postId} analytics={post?.analytics} refetchPost={refetchPost} />
            </motion.div>
          </div>
        </motion.article>
      )
      }
    </motion.div >
  );
}

export default FeedPost;
