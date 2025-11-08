import { DotLottiePlayer } from "@dotlottie/react-player";

export default function LazyDotLottie({ src, className }: { src: string; className?: string }) {
	return <DotLottiePlayer autoplay loop src={src} className={className} />;
}
