import { render, screen, fireEvent } from "@testing-library/react";
import Post from "@/components/Post";
import "@testing-library/jest-dom";

describe("Post Component", () => {
	it("should render the post with author and content", () => {
		render(<Post />);

		// Check if author and content are displayed
		expect(screen.getByText("Massive_Mission_6386")).toBeInTheDocument();
		expect(
			screen.getByText(
				"I love my dog, but I'm not bringing that big idiot everywhere with me"
			)
		).toBeInTheDocument();
	});

	it("should display comments", () => {
		render(<Post />);

		// Check if comment author and content are displayed
		expect(screen.getByText("Key_Warthog_1550")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Yeah my dog is wonderful and extremely friendly but his manners go out the window when he sees children so he stays home."
			)
		).toBeInTheDocument();
	});

	it("should toggle replies", () => {
		render(<Post />);

		// Find the button with more flexible matching
		const showRepliesButton = screen.getByText((content, element) => {
			return content.includes("Show") && content.includes("reply");
		});

		expect(showRepliesButton).toBeInTheDocument();

		// Click to show replies
		fireEvent.click(showRepliesButton);

		// Check if the nested reply appears
		expect(
			screen.getByText(
				"This is a nested reply to demonstrate the functionality."
			)
		).toBeInTheDocument();

		// Click to hide replies
		const hideRepliesButton = screen.getByText((content) =>
			content.includes("Hide")
		);
		fireEvent.click(hideRepliesButton);

		// The reply should no longer be visible
		expect(
			screen.queryByText(
				"This is a nested reply to demonstrate the functionality."
			)
		).not.toBeInTheDocument();
	});

	it("should handle upvotes and downvotes", () => {
		render(<Post />);

		const upvoteButton = screen.getAllByRole("button")[0];
		const downvoteButton = screen.getAllByRole("button")[1];

		// Click upvote button
		fireEvent.click(upvoteButton);

		// Click downvote button
		fireEvent.click(downvoteButton);

		// Both upvote and downvote buttons should still be in the document
		expect(upvoteButton).toBeInTheDocument();
		expect(downvoteButton).toBeInTheDocument();
	});
});
