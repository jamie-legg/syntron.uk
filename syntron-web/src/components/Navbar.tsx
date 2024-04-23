import Aside from "./auth/AuthAside";
import { HomeLink } from "./HomeLink";

export const NavBar = ({ title }: { title: string }) => {
  return (
    <div>
      <HomeLink page={title} />
    </div>
  );
};
