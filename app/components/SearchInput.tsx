import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function SearchInput({ defaultValue }: { defaultValue?: string }) {
	const navigate = useNavigate();
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (!e.currentTarget.value.trim()) {
				return;
			}
			navigate(`/search/${e.currentTarget.value.trim()}`);
		}
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!e.currentTarget.value.trim()) {
			return;
		}

		const formData = new FormData(e.currentTarget);
		const keyword = formData.get("keyword") as string;
		navigate(`/search/${keyword.trim()}`);
	};

	return (
		<form className="flex border py-2 px-4 rounded-full" onSubmit={handleSearch}>
			<input
				type="text"
				name="keyword"
				className="w-full outline-none"
				onKeyDown={handleKeyDown}
				defaultValue={defaultValue}
			/>
			<button className="cursor-pointer" type="submit">
				<SearchIcon className="text-gray-400" />
			</button>
		</form>
	);
}
