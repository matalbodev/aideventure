export default function Container({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-2 lg:px-[15rem]">
        {children}
    </div>
  )
}