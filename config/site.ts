export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "FindHydroPro",
  description: "Werbsite UMKM",
  navItemsCompany: [
    {
      icon: "FaHome",
      label: "Home",
      href: "/admin",
    },
    {
      icon: "FaClipboardCheck",
      label: "Akun",
      href: "/admin/akun",
    },
    {
      icon: "FaShoppingBasket",
      label: "Produk",
      href: "/admin/produk",
    },
    {
      icon: "FaShoppingBasket",
      label: "Pembelian",
      href: "/admin/pembelian",
    },
    {
      icon: "FaShoppingBasket",
      label: "Penjualan",
      href: "/admin/penjualan",
    },
    {
      icon: "FaShoppingBasket",
      label: "Validasi Penjualan",
      href: "/admin/validjual",
    },
    {
      icon: "FaClipboardCheck",
      label: "Laporan ",
      href: "/admin/laporan_penjualan",
    },
  ],
  navItemsAdmin: [
    {
      icon: "FaHome",
      label: "Home",
      href: "/admin",
    },
    {
      icon: "FaClipboardCheck",
      label: "Akun",
      href: "/admin/akun",
    },
    {
      icon: "FaClipboardCheck",
      label: "Laporan ",
      href: "/admin/laporan_penjualan",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Akun",
      href: "/admin/akun",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
