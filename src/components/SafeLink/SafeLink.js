import Link from "next/link";

const SafeLink = ({ href, children, className = "", ...rest }) => {
  let isValid = false;

  if (typeof href === "string" && href.trim() !== "") {
    isValid = true;
  }

  else if (
    href &&
    typeof href === "object" &&
    typeof href.pathname === "string" &&
    href.pathname.trim() !== ""
  ) {
    isValid = true;
  }

  if (!isValid) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
};

export default SafeLink;