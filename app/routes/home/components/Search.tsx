import { Input } from "~/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";

function SearchInput() {
	const navigate = useNavigate();
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			navigate(`/search/${e.currentTarget.value}`);
		}
	};

	return (
		<div className="flex border py-2 px-4 rounded-full">
			<input type="text" className="w-full outline-none" onKeyDown={handleKeyDown} />
			<button className="cursor-pointer">
				<SearchIcon className="text-gray-400" />
			</button>
		</div>
	);
}

export default function Search() {
	return (
		<div>
			<SearchInput />
		</div>
	);
}
