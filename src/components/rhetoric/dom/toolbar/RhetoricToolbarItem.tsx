interface RhetoricToolbarItemProps {
  title: string;
  onClick: () => void;
}
export function RhetoricToolbarItem({
  title,
  onClick,
}: RhetoricToolbarItemProps) {
  return (
    <div
      className="border-2 border-black rounded p-1 cursor-pointer"
      onClick={onClick}
    >
      {title}
    </div>
  );
}
