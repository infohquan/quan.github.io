using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace Khavi.Web.UIHelper
{
    /// <summary>
    /// Định nghĩa những phương thức nạp dữ liệu vào 
    /// CheckBoxList web controls
    /// </summary>
    public class CheckBoxListHelper
    {
        public void FillData(CheckBoxList cbl, Object objDataSource, String displayMember, String valueMember)
        {
            if (objDataSource != null)
            {
                cbl.DataSource = objDataSource;
                cbl.DataTextField = displayMember;
                cbl.DataValueField = valueMember;
            }
            else cbl.DataSource = null;
            cbl.DataBind();
        }
    }
}
