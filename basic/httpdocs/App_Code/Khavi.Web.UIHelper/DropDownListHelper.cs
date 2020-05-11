using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace Khavi.Web.UIHelper
{
    /// <summary>
    /// Định nghĩa những phương thức nạp dữ liệu vào 
    /// DropDownList web controls.
    /// </summary>
    public class DropDownListHelper
    {
        /// <summary>
        /// Điền dữ liệu vào DropDownList web control.
        /// </summary>
        /// <param name="ddl">Tên control DropDownList.</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List).</param>
        /// <param name="displayMember">Field dùng để hiển thị.</param>
        /// <param name="valueMember">Field dùng để lấy giá trị.</param>
        /// <param name="selectedValue">Chuỗi hiển thị đầu tiên của DropDownList. Nếu không muốn thì để chuỗi rỗng.</param>
        public void FillData(DropDownList ddl, Object objDataSource, String displayMember,
                             String valueMember, String selectedValue)
        {
            if (objDataSource != null)
            {    
                ddl.DataSource = objDataSource;
                ddl.DataTextField = displayMember;
                ddl.DataValueField = valueMember;
            }
            else ddl.DataSource = null;
            ddl.DataBind();
            if (selectedValue != "") ddl.Items.Insert(0, new ListItem(selectedValue, "0"));
            ddl.Attributes.Add("style", "color:Blue;");
        }

        /// <summary>
        /// Điền dữ liệu vào DropDownList web control.
        /// </summary>
        /// <param name="ddl">Tên control DropDownList.</param>
        /// <param name="objDataSource">Một đối tượng DataSource(DataTable, DataSet, List).</param>
        /// <param name="displayMember">Field dùng để hiển thị.</param>
        /// <param name="valueMember">Field dùng để lấy giá trị.</param>
        public void FillData(DropDownList ddl, Object objDataSource, String displayMember, String valueMember)
        {
            if (objDataSource != null)
            {
                ddl.DataSource = objDataSource;
                ddl.DataTextField = displayMember;
                ddl.DataValueField = valueMember;
            }
            else ddl.DataSource = null;
            ddl.DataBind();
        }

        public void FillData(HtmlSelect ddl, Object objDataSource, String displayMember, String valueMember, String selectedValue)
        {
            if (objDataSource != null)
            {
                ddl.DataSource = objDataSource;
                ddl.DataTextField = displayMember;
                ddl.DataValueField = valueMember;
            }
            else ddl.DataSource = null;
            ddl.DataBind();
            if (selectedValue != "") ddl.Items.Insert(0, new ListItem(selectedValue, "0"));
            //ddl.Attributes.Add("style", "color:Blue;");
        }
    }
}
