using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace MyTool
{
    /// <summary>
    /// ShoppingCart: Giỏ hàng online
    /// </summary>
    public class ShoppingCart
    {
        private DataTable shopcart;
        public DataTable ShopCart
        {
            get { return shopcart; }
            set { shopcart = value; }
        }
        public ShoppingCart()
        {
            shopcart = new DataTable();
        }

        public void InitShoppingCart()
        {            
            shopcart.Columns.Add("ID", typeof(int));
            shopcart.Columns.Add("GroupID", typeof(int));
            shopcart.Columns.Add("MaSanPham", typeof(string));
            shopcart.Columns.Add("TenGoi", typeof(string));
            shopcart.Columns.Add("GiaBan", typeof(string));
            shopcart.Columns.Add("GiaThamKhao", typeof(string));
            shopcart.Columns.Add("GiaKhuyenMai", typeof(string));
            shopcart.Columns.Add("ThongTin1", typeof(string));
            shopcart.Columns.Add("ThongTin2", typeof(string));
            shopcart.Columns.Add("ProducerID", typeof(int));
            shopcart.Columns.Add("SoLuong", typeof(int));
            shopcart.Columns.Add("Anh", typeof(string));
            shopcart.Columns.Add("TotalViews", typeof(int));
            shopcart.Columns.Add("ThanhTien", typeof(float));
            shopcart.Columns.Add("NgoaiTe", typeof(string));
            shopcart.Columns.Add("SizeID", typeof(int));
        }
        /// <summary>
        /// Kiểm tra xem giỏ hàng có hàng hay không
        /// </summary>
        /// <param name="ItemID"></param>
        /// <returns></returns>
        public int IsExistItemInShoppingCart(int ItemID)
        {
            int indexOfRow = -1; 
            int i = shopcart.Rows.Count;
            if (i > 0)
            {
                for (int dataRow = 0; dataRow < shopcart.Rows.Count; dataRow++)
                {
                    if (shopcart.Rows[dataRow]["ID"].ToString() == ItemID.ToString())
                    {
                        indexOfRow = dataRow;
                        break;
                    }
                }
            }
            return indexOfRow;
        }

        /// <summary>
        /// Kiểm tra SP có ID là ItemID và SizeID đã tồn tại trong Giỏ hàng chưa
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="SizeID"></param>
        /// <returns>Trả về vị trí mà SP đã tồn tại trong Giỏ hàng (nếu có)</returns>
        public int IsExistItemInShoppingCart(int ItemID, int SizeID)
        {
            int indexOfRow = -1;
            int i = shopcart.Rows.Count;
            if (i > 0)
            {
                for (int dataRow = 0; dataRow < shopcart.Rows.Count; dataRow++)
                {
                    if (shopcart.Rows[dataRow]["ID"].ToString() == ItemID.ToString() && shopcart.Rows[dataRow]["SizeID"].ToString() == SizeID.ToString())
                    {
                        indexOfRow = dataRow;
                        break;
                    }
                }
            }
            return indexOfRow;
        }
        
        /// <summary>
        /// Thêm SP vào giỏ hàng
        /// </summary>
        /// <param name="ItemID"></param>
        /// <param name="GroupID"></param>
        /// <param name="MaSanPham"></param>
        /// <param name="TenGoi"></param>
        /// <param name="GiaBan"></param>
        /// <param name="GiaThamKhao"></param>
        /// <param name="GiaKhuyenMai"></param>
        /// <param name="ThongTin1"></param>
        /// <param name="ThongTin2"></param>
        /// <param name="ProducerID"></param>
        /// <param name="SoLuong"></param>
        /// <param name="Anh"></param>
        /// <param name="TotalViews"></param>
        /// <param name="NgoaiTe"></param>
        public void AddToShoppingCart(int ItemID, int GroupID, string MaSanPham, string TenGoi, string GiaBan, string GiaThamKhao, string GiaKhuyenMai, 
                    string ThongTin1, string ThongTin2, int ProducerID, int SoLuong, string Anh, int TotalViews, string NgoaiTe, int SizeID)
        {
            /*DataTable dataTable;
            if (Session["ShoppingCart"] == null)
                InitShoppingCart();
            dataTable = (DataTable)Session["ShoppingCart"];*/
            
            int indexOfItem = IsExistItemInShoppingCart(ItemID, SizeID);
            //if (soluong < soluongton)
            //{
            if (indexOfItem != -1)
            {
                shopcart.Rows[indexOfItem]["SoLuong"] = Convert.ToInt32(shopcart.Rows[indexOfItem]["SoLuong"]) + SoLuong;
            }
            else
            {
                DataRow dataRow = shopcart.NewRow();
                dataRow[0] = ItemID.ToString();
                dataRow[1] = GroupID.ToString();
                dataRow[2] = MaSanPham;
                dataRow[3] = TenGoi;
                dataRow[4] = GiaBan;
                dataRow[5] = GiaThamKhao;
                dataRow[6] = GiaKhuyenMai;
                dataRow[7] = ThongTin1;
                dataRow[8] = ThongTin2;
                dataRow[9] = ProducerID.ToString();
                dataRow[10] = SoLuong.ToString();
                dataRow[11] = Anh;
                dataRow[12] = TotalViews.ToString();
                dataRow[13] = SoLuong * Convert.ToInt32(GiaBan);
                dataRow[14] = NgoaiTe;
                dataRow[15] = SizeID;
                shopcart.Rows.Add(dataRow);
            }
            // }
            /*else
                Response.Write("Chỉ còn " + soluongton.Text + " cái");*/
            //Session["ShoppingCart"] = dataTable;
        }


        public void AddToShoppingCart(int ItemID, int GroupID, string MaSanPham, string TenGoi, string GiaBan, string GiaThamKhao, string GiaKhuyenMai,
                    string ThongTin1, string ThongTin2, int ProducerID, int SoLuong, string Anh, int TotalViews, string NgoaiTe)
        {
            int indexOfItem = IsExistItemInShoppingCart(ItemID);
            
            if (indexOfItem != -1)
            {
                shopcart.Rows[indexOfItem]["SoLuong"] = Convert.ToInt32(shopcart.Rows[indexOfItem]["SoLuong"]) + SoLuong;
            }
            else
            {
                DataRow dataRow = shopcart.NewRow();
                dataRow[0] = ItemID.ToString();
                dataRow[1] = GroupID.ToString();
                dataRow[2] = MaSanPham;
                dataRow[3] = TenGoi;
                dataRow[4] = GiaBan;
                dataRow[5] = GiaThamKhao;
                dataRow[6] = GiaKhuyenMai;
                dataRow[7] = ThongTin1;
                dataRow[8] = ThongTin2;
                dataRow[9] = ProducerID.ToString();
                dataRow[10] = SoLuong.ToString();
                dataRow[11] = Anh;
                dataRow[12] = TotalViews.ToString();
                dataRow[13] = SoLuong * Convert.ToInt32(GiaBan);
                dataRow[14] = NgoaiTe;
                shopcart.Rows.Add(dataRow);
            }
        }

        public void UpdateCart(int ProductID, int NewQuantity)
        {
            foreach (DataRow dr in shopcart.Rows)
            {
                if (Convert.ToInt32(dr["ID"].ToString()) == ProductID)
                {
                    dr["SoLuong"] = NewQuantity;
                    return;
                }
            }
        }

        public void RemoveItemInCart(int Position)
        {
            shopcart.Rows[Position].Delete();
        }

        public double GetTotalMoney()
        { 
            double TotalMoney = 0;
            for (int i = 0; i < shopcart.Rows.Count; i++)
            {
                double Money = Convert.ToDouble(shopcart.Rows[i]["GiaBan"]) * Convert.ToInt32(shopcart.Rows[i]["SoLuong"]);
                TotalMoney += Money;
            }
            return TotalMoney;
        }
    }
}
