import Link from "next/link";

export const HomeLink = ({ page }: {
    page: string;
}) => {
    return (
        <Link href="/">
                  <div className="bg-black bg-opacity-80 w-screen h-max flex justify-left items-center tracking-widest uppercase">
            <h1 className="text-sky-800 text-2xl font-bold">Syntron.uk |</h1>
            <h1 className="text-sky-400 text-2xl font-bold">
              &nbsp;armagetron advanced{" "}
            </h1>
            <h1 className="text-sky-800 text-2xl font-bold">&nbsp;|</h1>

            <h1 className="text-sky-200 text-2xl font-bold">&nbsp;{page}</h1>
            <h1 className="text-sky-800 text-2xl font-bold">&nbsp;|</h1>
          </div>
        </Link>
    )

}