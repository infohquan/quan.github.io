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
    /// DataList web controls
    /// </summary>
    public class DataListHelper
    {
        public void FillData(DataList dl, Object objDataSource)
        {
            if (objDataSource != null)
                dl.DataSource = objDataSource;
            else dl.DataSource = null;
            dl.DataBind();
        }
    }
}
