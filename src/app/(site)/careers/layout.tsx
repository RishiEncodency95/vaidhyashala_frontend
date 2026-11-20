// Careers pages use the same site-wide Poppins font as every other page.
export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
