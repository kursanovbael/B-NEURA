import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type TurnControlsProps = {
  visible: boolean;
  onTurn: (direction: -1 | 1) => void;
  onReset: () => void;
};

/**
 * Keyboard and button way to turn the helmet, next to dragging it. Shown where
 * the helmet is free to explore: the first view and the exploded view.
 */
export function TurnControls({ visible, onTurn, onReset }: TurnControlsProps) {
  return (
    <div
      inert={!visible}
      className={cn(
        "transition-ui fixed top-16 right-4 z-30 flex flex-col items-end gap-2 md:top-auto md:right-8 md:bottom-8",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <p className="type-meta bg-background/70 hidden rounded-sm px-1.5 md:block">
        Drag the helmet to turn it
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => onTurn(-1)}
          className="max-md:!min-h-9 max-md:!px-3"
        >
          Turn left
        </Button>
        <Button
          variant="secondary"
          onClick={() => onTurn(1)}
          className="max-md:!min-h-9 max-md:!px-3"
        >
          Turn right
        </Button>
        <Button
          variant="ghost"
          onClick={onReset}
          className="max-md:!min-h-9 max-md:!px-3"
        >
          Reset view
        </Button>
      </div>
    </div>
  );
}
