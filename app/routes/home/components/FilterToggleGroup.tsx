import { Toggle } from "~/components/ui/toggle";

type OptionMap = Record<string, string>;

export function FilterToggleGroup<T extends string>({
    title,
    options,
    value,
    onChange,
}: {
    title: string;
    options: OptionMap;
    value: T | "ALL";
    onChange: (next: T | "ALL") => void;
}) {
    return (
        <section>
            <h3>{title}</h3>
            <div className="flex gap-2">
                {Object.keys(options).map((key) => (
                    <Toggle
                        variant="outline"
                        key={key}
                        pressed={value === key}
                        onPressedChange={(pressed) => {
                            onChange(pressed ? (key as T) : "ALL");
                        }}
                    >
                        {options[key]}
                    </Toggle>
                ))}
            </div>
        </section>
    );
}
