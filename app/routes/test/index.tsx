import { useState } from "react";

export default function Test() {
	const [count, setCount] = useState(0);
	const rawItems = ["apple", "banana", "avocado", "grape", "orange"];

	//  useMemo 없어도 자동으로 캐싱됨
	const filtered = rawItems.filter((item) => {
		console.log("🔍 비싼 필터 연산 실행");
		return item.includes("a");
	});

	// 💡 useCallback 없어도 참조가 유지됨
	const handleSelect = (item: string) => {
		console.log("선택됨:", item);
	};

	return (
		<div>
			<h1>React Compiler 테스트</h1>

			<button onClick={() => setCount((c) => c + 1)}>count 증가: {count}</button>

			<List items={filtered} onSelect={handleSelect} />
		</div>
	);
}

function List({ items, onSelect }: { items: string[]; onSelect: (item: string) => void }) {
	console.log("List 렌더 실행됨");

	return (
		<ul>
			{items.map((item) => (
				<li key={item} onClick={() => onSelect(item)}>
					{item}
				</li>
			))}
		</ul>
	);
}
