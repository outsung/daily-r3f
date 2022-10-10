interface RhetoricInfoProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}
export function RhetoricInfo({ title, children }: RhetoricInfoProps) {
  return (
    <div className="p-2">
      <div className="font-bold">{title}</div>
      <div className="py-2">{children}</div>
    </div>
  );
}

interface RhetoricInfoItemProps {
  label: string;
  children: React.ReactNode | React.ReactNode[];
}
export function RhetoricInfoItem({ label, children }: RhetoricInfoItemProps) {
  return (
    <div className="flex flex-row">
      <div className="w-1/3">{label}</div>
      <div className="w-2/3 break-all">{children}</div>
    </div>
  );
}
