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
    /// DetailsView web controls
    /// </summary>
    public class DetailsViewHelper
    {
        /// <summary>
        /// Điền dữ liệu vào DetailsView web control
        /// </summary>
        /// <param name="dtView">Tên control DetailsView</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List)</param>
        public void FillData(DetailsView dtView, Object objDataSource)
        {
            if (objDataSource != null)
                dtView.DataSource = objDataSource;
            else dtView.DataSource = null;
            dtView.DataBind();
        }
        /// <summary>
        /// Điền dữ liệu vào DetailsView web control
        /// </summary>
        /// <param name="dtView">Tên control DetailsView</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List)</param>
        /// <param name="pageCount">Số button hiển thị</param>
        /// <param name="pageButton">Kiểu button để hiển thị</param>
        public void FillData(DetailsView dtView, Object objDataSource, Int32 pageCount, PagerButtons pageButton)
        {
            dtView.AllowPaging = true;
            if (objDataSource != null)
            {
                dtView.PagerSettings.PageButtonCount = pageCount;
                dtView.PagerSettings.Mode = pageButton;
                dtView.DataSource = objDataSource;
            }
            else dtView.DataSource = null;
            dtView.DataBind();
        }
    }
}
