using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Khavi.Web.UIHelper
{
    /// <summary>
    /// Định nghĩa những phương thức nạp dữ liệu vào 
    /// GridView web controls
    /// </summary>
    public class GridViewHelper
    {
        /// <summary>
        /// Điền dữ liệu vào GridView web control
        /// </summary>
        /// <param name="grView">Tên control GridView</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List)</param>
        public void FillData(GridView grView, Object objDataSource)
        {
            if (objDataSource != null)
                grView.DataSource = objDataSource;
            else grView.DataSource = null;
            grView.DataBind();
        }
        /// <summary>
        /// Điền dữ liệu vào GridView web control
        /// </summary>
        /// <typeparam name="T">Kiểu của List</typeparam>
        /// <param name="grView">Tên control GridView</param>
        /// <param name="list">Danh sách T</param>
        public void FillData<T>(GridView grView, List<T> list)
        {
            if (list != null)
                grView.DataSource = list;
            else grView.DataSource = null;
            grView.DataBind();
        }
        /// <summary>
        /// Điền dữ liệu vào GridView web control
        /// </summary>
        /// <param name="grView">Tên control GridView</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List)</param>
        /// <param name="pageSize">Số mẩu tin hiển thị trên 1 trang</param>
        /// <param name="pageCount">Số button hiển thị</param>
        /// <param name="pageButton">Kiểu button để hiển thị</param>
        public void FillData(GridView grView, Object objDataSource, Int32 pageSize,
                             Int32 pageCount, PagerButtons pageButton)
        {
            grView.AllowPaging = true;
            if (objDataSource != null)
            {
                grView.PageSize = pageSize;
                grView.PagerSettings.PageButtonCount = pageCount;
                grView.PagerSettings.Mode = pageButton;
                grView.DataSource = objDataSource;
            }
            else grView.DataSource = null;
            grView.DataBind();
        }
    }
}
