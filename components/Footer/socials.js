"use client";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const socials = [
  {
    icon: <FacebookIcon fontSize="large" color="primary" />,
    link: "https://www.facebook.com/syodo.sushi.lviv",
  },
  {
    icon: <InstagramIcon fontSize="large" color="primary" />,
    link: "https://www.instagram.com/syodo.sushi/",
  },
];
export default function Socials() {
  return (
    <div className="space-x-2">
      {socials.map(({ icon, link }, key) => (
        <a href={link} key={"social-footer-" + key}>
          {icon}
        </a>
      ))}
    </div>
  );
}
