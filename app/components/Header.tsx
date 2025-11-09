import { Link } from "react-router";
import { SearchInput } from "./SearchInput";

export default function Header() {
	return (
		<div className="sticky top-0 z-50 py-4 backdrop-blur-md bg-white/80 border-b">
			<div className="flex items-center max-w-7xl mx-auto gap-4">
				<Link to="/">
					<h1 className="text-2xl font-bold whitespace-nowrap">공연 정보 사이트</h1>
				</Link>
				<SearchInput />
			</div>
		</div>
	);
}
