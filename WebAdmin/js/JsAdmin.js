

function ViewImage(idImgView, pathImage)
{
    document.getElementById(idImgView).style.display = "";
    document.getElementById(idImgView).src = pathImage;
}

function toggleMenu(id)
{
    $('#' + id).toggle();
}