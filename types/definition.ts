interface AkunType {
  id: number;
  kode_akun_header: string;
  nama_akun_header: string;
  saldo_normal: string;
  company: string;
  kode_akun: string;
  nama_akun: string;
}

interface AkunHeaderType {
  kode_akun_header: string;
  nama_akun_header: string;
}

interface AkunDetailType {
  kode_akun_header: string;
  kode_akun: string;
  nama_akun: string;
}

interface ProdukType {
  id: number;
  company: string;
  kode_produk: string;
  nama_produk: string;
  deskripsi: string;
  harga_beli: number;
  harga_jual: number;
}

interface DetailPembelianType {
  kode_produk: string;
  nama_produk: string;
  qty: number;
  harga_beli: number;
  harga_jual: number;
}
interface DetailPenjualanType {
  kode_produk: string;
  nama_produk: string;
  qty: number;
  harga_beli: number;
  harga_jual: number;
}

interface TransaksiHeaderType {
  company: string;
  kode_transaksi: string;
  tgl_transaksi: string;
  jenis_transaksi: string;
  deskripsi: string;
  user: string;
  data: TransaksiDetailDataType[];
}

interface TransaksiDetailType {
  kode_transaksi: string;
  kode_produk: string;
  qty: number;
  harga: number;
}
interface TransaksiDetailDataType {
  kode_produk: string;
  nama_produk: string;
  qty: number;
  harga_jual: number;
  harga_beli: number;
}

interface TransaksiDetailJurnalType {
  kode_transaksi: string;
  no_akun: string;
  debet: number;
  kredit: number;
}

interface CustomerType {
  id: number;
  nama: string;
  email: string;
  customer_company: string;
  no_telpon: string;
  alamat: string;
  status: string;
}
