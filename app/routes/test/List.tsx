export default function List({
	items,
	onSelect,
}: {
	items: string[];

	onSelect: (item: string) => void;
}) {
	console.log("List 렌더 실행됨");

	return (
		<ul>
			{items.map((item) => (
				<li key={item} style={{ cursor: "pointer", padding: 4 }} onClick={() => onSelect(item)}>
					{item}
				</li>
			))}
		</ul>
	);
}
