export default function SkeletonPerfInfoCard({ count = 20 }: { count?: number }) {
	const items = Array.from({ length: count });

	return items.map((item) => (
		<div className="border rounded-lg flex p-2 gap-2 border-gray-300 relative">
			<div className="aspect-[3/4] w-[124px] object-cover rounded-lg shrink-0 bg-gray-300 animate-pulse" />
			<div className="flex-1 justify-center flex flex-col gap-2">
				<p className="h-4 w-20 bg-gray-300 animate-pulse rounded-lg"></p>
				<p className="h-4 w-60 bg-gray-300 animate-pulse rounded-lg"></p>
				<p className="h-4 w-20 bg-gray-300 animate-pulse rounded-lg"></p>
			</div>
		</div>
	));
}
