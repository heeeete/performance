import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";

export function SearchInput({ defaultValue }: { defaultValue?: string }) {
	const navigate = useNavigate();
	const inputRef = useRef<HTMLInputElement>(null);

	// defaultValue가 변경될 때마다 input 값을 업데이트
	useEffect(() => {
		if (inputRef.current && defaultValue !== undefined) {
			inputRef.current.value = defaultValue;
		}
	}, [defaultValue]);

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

		const formData = new FormData(e.currentTarget);
		const keyword = formData.get("keyword") as string;

		if (!keyword.trim()) {
			return;
		}

		navigate(`/search/${keyword.trim()}`);
	};

	return (
		<form className="flex border py-2 px-4 rounded-full" onSubmit={handleSearch}>
			<input
				ref={inputRef}
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
