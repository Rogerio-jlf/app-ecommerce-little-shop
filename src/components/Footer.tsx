// components/Footer.jsx
"use client";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Categorias",
      links: [
        { label: "Eletrônicos", href: "/categoria/eletronicos" },
        { label: "Moda", href: "/categoria/moda" },
        { label: "Casa e Decoração", href: "/categoria/casa-decoracao" },
        { label: "Beleza e Saúde", href: "/categoria/beleza-saude" },
        { label: "Esportes", href: "/categoria/esportes" },
      ],
    },
    {
      title: "Minha Conta",
      links: [
        { label: "Meus Pedidos", href: "/conta/pedidos" },
        { label: "Lista de Desejos", href: "/conta/lista-desejos" },
        { label: "Carrinho", href: "/carrinho" },
        { label: "Configurações", href: "/conta/configuracoes" },
        { label: "Rastrear Pedido", href: "/rastreamento" },
      ],
    },
    {
      title: "Institucional",
      links: [
        { label: "Sobre Nós", href: "/sobre" },
        { label: "Política de Privacidade", href: "/politica-privacidade" },
        { label: "Termos de Serviço", href: "/termos-servico" },
        { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Youtube size={20} />,
      href: "https://youtube.com",
      label: "Youtube",
    },
  ];

  const contactInfo = [
    { icon: <MapPin size={18} />, text: "Av. Paulista, 1000 - São Paulo, SP" },
    { icon: <Phone size={18} />, text: "(11) 9999-9999" },
    { icon: <Mail size={18} />, text: "contato@suaecommerce.com.br" },
  ];

  const paymentMethods = [
    "Visa",
    "Mastercard",
    "American Express",
    "PayPal",
    "Pix",
    "Boleto",
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white mb-1">Sua Loja</h2>
              <p className="text-gray-400 text-sm mb-4">
                Produtos de qualidade com os melhores preços para você
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center text-gray-400">
                  <span className="mr-2 text-gray-300">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, i) => (
            <div key={i} className="col-span-1">
              <h3 className="font-semibold text-lg text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-sm font-medium text-white mb-4">
            Formas de Pagamento
          </h4>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method, i) => (
              <span
                key={i}
                className="bg-gray-800 text-xs py-1 px-3 rounded-md text-gray-300"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Sua Loja. Todos os direitos reservados.
          </p>

          <div className="flex space-x-6">
            <a
              href="/politica-privacidade"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos-servico"
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
