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
    /// Repeater web controls
    /// </summary>
    public class RepeaterHelper
    {
        /// <summary>
        /// Điền dữ liệu vào Repeater web control
        /// </summary>
        /// <param name="rpt">Tên control Repeater</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List)</param>
        public void FillData(Repeater rpt, Object objDataSource)
        {
            if (objDataSource != null)
                rpt.DataSource = objDataSource;
            else rpt.DataSource = null;
            rpt.DataBind();
        }
    }
}
