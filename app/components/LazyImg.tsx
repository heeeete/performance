import { useCallback, useState } from "react";

import { cn } from "~/lib/utils";

export default function LazyImg({
    src,
    alt,
    className,
    ...imgProps
}: {
    src: string;
    alt: string;
    className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
    const [isLoading, setIsLoading] = useState(true);

    // useCallback으로 메모이제이션하여 불필요한 리렌더링 방지
    const handleLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <img
            src={src}
            alt={alt}
            className={cn(className, isLoading && "animate-pulse bg-gray-300")}
            loading="lazy"
            decoding="async"
            {...imgProps}
            onLoad={handleLoad}
        />
    );
}
