type Props = {
  children: React.ReactNode;
  modalpost: React.ReactNode;
  modalfollow: React.ReactNode;
};
export default function ProfileLayout({
  children,
  modalfollow,
}: Props) {
  return (
    <div className="relative">
      {children}
      {modalfollow}
    </div>
  );
}
