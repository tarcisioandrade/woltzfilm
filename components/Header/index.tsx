import Link from "next/link";

type Props = {
  title: string;
  redirect: string;
  linkTo: string;
};
const Header = ({ title, redirect, linkTo }: Props) => {
  return (
    <header className="h-40 bg-black/20  flex justify-between items-center">
      <div className="container mx-auto px-6  flex justify-between items-center">
        <p className="text-blue-500 font-bold text-5xl">{title}</p>
        <Link href={linkTo}>
          <a className="text-2xl hover:text-slate-300 transition-colors">
            {redirect}
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
