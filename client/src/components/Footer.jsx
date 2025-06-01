import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10 ">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-400/30">
        <div>
          <img className="w-34 md:w-32" src={assets.GreenFit_Logo} alt="GreenFit Logo" />
          <p className="max-w-[410px] mt-6 ">
            At GreenFit, we deliver organic foods and fitness supplements to your door in under 30 minutes—fresh from the source and priced to fit your lifestyle. Trusted by thousands, we’re your go-to for quality, speed, and a healthier you.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-3 md:mb-5">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:underline transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-400">
        Copyright {new Date().getFullYear()} © QAP.dev. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
