import { render } from "@testing-library/react";
import Post from "@/components/Post";

describe("Post component", () => {
	it("renders the post component without errors", () => {
		render(<Post />);
		// No expectations, so the test will always pass
	});
});
