using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;

namespace Khavi.Web.UIHelper
{
    public class ImageHelper
    {
        public static void ResizeImage(String fileNameIn, String fileNameOut, Int32 maxWidthOrHeight)
        {
            //Boolean portrait = false;

            Bitmap bmpSource = null;

            bmpSource = new Bitmap(fileNameIn);
            Size originalSize = bmpSource.Size;
            Size newSize = new Size(0, 0);

            bmpSource.Dispose();
            Decimal maxHeightDecimal = Convert.ToDecimal(maxWidthOrHeight);
            Decimal maxWidthAsDecimal = Convert.ToDecimal(maxWidthOrHeight);

            Decimal resizeFactor;

            if (originalSize.Height > originalSize.Width)
            {
                resizeFactor = Convert.ToDecimal(Decimal.Divide(originalSize.Height, maxHeightDecimal));
                newSize.Height = maxWidthOrHeight;
                newSize.Width = Convert.ToInt32(originalSize.Width / resizeFactor);
            }
            else
            {
                resizeFactor = Convert.ToDecimal(Decimal.Divide(originalSize.Width, maxWidthAsDecimal));
                newSize.Width = maxWidthOrHeight;
                newSize.Height = Convert.ToInt32(originalSize.Height / resizeFactor);
            }

            Bitmap mySourceBitmap = null;
            Bitmap myTargetBitmap = null;
            Graphics myGraphics = null;

            try
            {
                mySourceBitmap = new Bitmap(fileNameIn);

                Int32 newWidth = newSize.Width;
                Int32 newHeight = newSize.Height;

                myTargetBitmap = new Bitmap(newWidth, newHeight);

                myGraphics = Graphics.FromImage(myTargetBitmap);

                myGraphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;

                myGraphics.DrawImage(mySourceBitmap, new Rectangle(0, 0, newWidth, newHeight));
                mySourceBitmap.Dispose();

                myTargetBitmap.Save(fileNameOut, ImageFormat.Jpeg);
            }
            catch
            {
                
            }
            finally
            {
                if (myGraphics != null)
                    myGraphics.Dispose();

                if (mySourceBitmap != null)
                    mySourceBitmap.Dispose();

                if (myTargetBitmap != null)
                    myTargetBitmap.Dispose();
            }
        }
    }
}