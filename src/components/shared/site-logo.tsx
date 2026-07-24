import Image from "next/image";
import siteContent from "@/content/site.json";

interface SiteLogoProps {
  placement?: "header" | "footer";
}

export default function SiteLogo({ placement = "header" }: SiteLogoProps) {
  const sizing =
    placement === "footer"
      ? "h-auto w-[190px] sm:w-[210px]"
      : "h-auto w-[108px] sm:w-[120px] xl:w-[134px]";
  const spacing =
    placement === "header" ? "inline-flex items-center pt-1" : "inline-flex";

  return (
    <span className={spacing}>
      <Image
        src={siteContent.logo.image}
        alt={siteContent.name}
        width={841}
        height={457}
        sizes={
          placement === "footer"
            ? "(min-width: 640px) 210px, 190px"
            : "(min-width: 1280px) 134px, (min-width: 640px) 120px, 108px"
        }
        className={sizing}
        priority={placement === "header"}
      />
    </span>
  );
}
