"use client";

import { useState } from 'react'
import { ChevronDown, ChevronUp, MessageSquare, Award, Share, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const CommentComponent = ({ comment, isReply = false, onAddReply }) => {
  const [showReplies, setShowReplies] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const handleReply = () => {
    if (replyContent.trim()) {
      const newReply = {
        author: 'Current User',
        avatar: '/placeholder.svg?height=40&width=40',
        content: replyContent,
        timestamp: 'Just now',
        votes: 0,
      }
      onAddReply(comment.id, newReply)
      setReplyContent('')
      setIsReplying(false)
      setShowReplies(true)
    }
  }

  return (
    <div className={`flex ${isReply ? 'ml-8 mt-2' : 'mt-4'}`}>
      {!isReply && (
        <div className="mr-2 w-[2px] bg-gray-200 flex-shrink-0" />
      )}
      <div className="flex-grow">
        <div className="flex items-start space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={comment.avatar} alt={comment.author} />
            <AvatarFallback>{comment.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">{comment.author}</span>
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-semibold">{comment.votes}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsReplying(!isReplying)}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Award className="h-4 w-4 mr-1" />
                Award
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            {isReplying && (
              <div className="mt-2">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full min-h-[100px] p-2 text-sm"
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>Cancel</Button>
                  <Button size="sm" onClick={handleReply}>Submit</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} more {comment.replies.length === 1 ? 'reply' : 'replies'}
            </Button>
            {showReplies && (
              <div className="border-l-2 border-gray-200 pl-4 mt-2">
                {comment.replies.map((reply) => (
                  <CommentComponent key={reply.id} comment={reply} isReply onAddReply={onAddReply} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Post = () => {
  const [post, setPost] = useState({
    id: 1,
    author: 'Massive_Mission_6386',
    avatar: '/placeholder.svg?height=40&width=40',
    content: "I love my dog, but I'm not bringing that big idiot everywhere with me",
    timestamp: '9h ago',
    votes: 395,
    comments: [
      {
        id: 2,
        author: 'Key_Warthog_1550',
        avatar: '/placeholder.svg?height=40&width=40',
        content: 'Yeah my dog is wonderful and extremely friendly but his manners go out the window when he sees children so he stays home.',
        timestamp: '5h ago',
        votes: 61,
        replies: [
          {
            id: 3,
            author: 'Reply_User',
            avatar: '/placeholder.svg?height=40&width=40',
            content: 'This is a nested reply to demonstrate the functionality.',
            timestamp: '3h ago',
            votes: 15,
          },
        ],
      },
    ],
  })

  const addReply = (parentId, newReply) => {
    setPost((prevPost) => {
      const updateComments = (comments) => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), { ...newReply, id: Date.now() }],
            }
          } else if (comment.replies) {
            return {
              ...comment,
              replies: updateComments(comment.replies),
            }
          }
          return comment
        })
      }

      return {
        ...prevPost,
        comments: updateComments(prevPost.comments),
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-start space-x-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.avatar} alt={post.author} />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{post.author}</span>
            <span className="text-sm text-gray-500">{post.timestamp}</span>
          </div>
          <p className="text-lg mt-1">{post.content}</p>
          <div className="flex items-center space-x-4 mt-4">
            <Button variant="ghost" size="sm">
              <ChevronUp className="h-4 w-4 mr-1" />
              {post.votes}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Reply
            </Button>
            <Button variant="ghost" size="sm">
              <Award className="h-4 w-4 mr-1" />
              Award
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {post.comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} onAddReply={addReply} />
        ))}
      </div>
    </div>
  )
}

export default function Component() {
  return <Post />
}