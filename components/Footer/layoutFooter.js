import Image from "next/image";
import { appConfig } from "configs/config";
import Socials from "./socials";

export default function LayoutFooter() {
  const date = new Date().getFullYear();
  const brand = {
    name: "",
    icon: "/assets/images/logos/SYODOlogo_black.png",
    description: "",
  };

  return (
    <div className="bg-black text-white py-4 grid justify-items-center " id="footer">
      <div className="max-w-screen-2xl grid md:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* LOGO */}
        <div className="text-center">
          <a href="/">
            <Image src={brand.icon} alt="Syodo" width={210} height={118} />
          </a>

          <Socials />
        </div>

        {/* ADDRESS */}
        <div className="text-center">
          <h3>Адреса</h3>
          <p className="grid">
            <span>вул. Трускавецька, 2a</span>
            <a href="tel:+380677229345">+38 (067) 722 93 45</a>
          </p>

          <p className="grid">
            <span>вул. Малоголосківська, 28</span>
            <a href="tel:+380631398512">+38 (063) 139 85 12</a>
          </p>
        </div>

        {/* WORKING HOURS */}
        <div className="text-center ">
          <h3>Графік роботи</h3>
          <p>
            Пн-Нд: {appConfig.WORKING_HOURS.FROM}-{appConfig.WORKING_HOURS.TO}
          </p>
        </div>

        {/* PAGES */}
        <div className="grid justify-items-center pt-5">
          <a href="/contacts" className="mb-1">
            Контакти
          </a>
          <a href="/promotions">Акції</a>
          <a href="/blog">Блог</a>
          <a href="/about">Про нас</a>
        </div>

        {/* COPYRIGHTS */}
        <div className="text-center">
          <h3></h3>
          <a href="/oferta">Оферта</a>

          <div className="flex justify-center pt-4">
            <Image
              className="bg-white border border-solid border-white rounded-md align-middle mx-1 p-1"
              src="/assets/images/logos/mastercard.png"
              alt="mastercard"
              height={45}
              width={59}
            />

            <Image
              className="bg-white border border-solid border-white rounded-md align-middle mx-1 p-1"
              src="/assets/images/logos/visa.png"
              alt="visa"
              height={45}
              width={59}
            />
          </div>
          <p className="text-xs">Copyright &copy; {date} SYODŌ.</p>
          <p className="text-xs">Created by Serhiy Sadurskyy</p>
        </div>
      </div>
    </div>
  );
}
