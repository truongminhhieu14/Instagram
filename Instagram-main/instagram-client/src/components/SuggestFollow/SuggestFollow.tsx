import UserCompact from "../UserCompact/UserCompact";

type Props = {
  className?: string;
};
export default function SuggestFollow({ className }: Props) {
  return (
    <div className={className}>
      <UserCompact className="flex items-center justify-between mb-4" />
      <p className="text-slate-400 font-semibold text-sm mb-4">
        Suggested for you
      </p>
      <UserCompact className="flex items-center justify-between mb-4" />
      <UserCompact className="flex items-center justify-between mb-4" />
      <UserCompact className="flex items-center justify-between mb-4" />
      <UserCompact className="flex items-center justify-between mb-4" />

    </div>
  );
}
