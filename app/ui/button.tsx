export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
    >
      {children}
    </button>
  );
}
