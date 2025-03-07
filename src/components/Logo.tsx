import Link from "next/link";
import { FaAmazon } from "react-icons/fa";

const LogoComponent = () => {
  return (
    <>
      <Link href="/">
        <div>
          <FaAmazon className="w-10 h-10 text-white" />
        </div>
      </Link>
    </>
  );
};

export default LogoComponent;
