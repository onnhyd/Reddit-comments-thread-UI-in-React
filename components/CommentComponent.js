"use client";
import { useState } from "react";
import {
	ChevronDown,
	ChevronUp,
	MessageSquare,
	Award,
	Share,
	MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CommentComponent = ({ comment, isReply = false, onAddReply }) => {
	const [showReplies, setShowReplies] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [replyContent, setReplyContent] = useState("");

	const handleReply = () => {
		if (replyContent.trim()) {
			const newReply = {
				author: "Current User",
				avatar: "/placeholder.svg?height=40&width=40",
				content: replyContent,
				timestamp: "Just now",
				votes: 0,
			};
			onAddReply(comment.id, newReply);
			setReplyContent("");
			setIsReplying(false);
			setShowReplies(true);
		}
	};

	return (
		<div className={`flex ${isReply ? "ml-8 mt-2" : "mt-4"}`}>
			{!isReply && <div className="mr-2 w-[2px] bg-gray-200 flex-shrink-0" />}
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
							<Button
								variant="ghost"
								size="sm"
								className="text-xs"
								onClick={() => setIsReplying(!isReplying)}
							>
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
									<Button
										variant="outline"
										size="sm"
										onClick={() => setIsReplying(false)}
									>
										Cancel
									</Button>
									<Button size="sm" onClick={handleReply}>
										Submit
									</Button>
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
							{showReplies ? "Hide" : "Show"} {comment.replies.length} more{" "}
							{comment.replies.length === 1 ? "reply" : "replies"}
						</Button>
						{showReplies && (
							<div className="border-l-2 border-gray-200 pl-4 mt-2">
								{comment.replies.map((reply) => (
									<CommentComponent
										key={reply.id}
										comment={reply}
										isReply
										onAddReply={onAddReply}
									/>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentComponent;
