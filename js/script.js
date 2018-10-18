var image, picker, canvas, slices, download, count, context;

window.onload = function()
{
  picker = document.getElementById("filePicker");
  canvas = document.getElementById("canvas");
  slices = document.getElementById("slices");
  count = document.getElementById("count");
  download = document.getElementById("download");
  context = canvas.getContext("2d");
  image = new Image();
  image.addEventListener('load', showPhoto);
  image.addEventListener('error', invalidPhoto);
}

function selectPhoto()
{
  picker.click();
}

function loadPhoto(input)
{
  if (input.files[0])
  {
    var reader = new FileReader();
    reader.onload = function (e)
    {
      image.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function showPhoto()
{
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.style.display = "block";
  slices.style.display = "block";
  download.style.display = "block";
  divide();
}

function invalidPhoto()
{
  canvas.style.display = "none";
  slices.style.display = "none";
  download.style.display = "none";
}

function divide()
{

  var n = count.value;

  if( n <= 0)
  {
    context.drawImage(image,0,0);
    return;
  }

  var width = image.width / n;
  var height = image.height;

  for(var i = 0; i < n ; i++)
  {
    context.drawImage(image,i*width,0,width,height,image.width - width*(i+1),0,width,height);
  }

}

function downloadPhoto()
{
  var link = document.createElement('a');
  link.download = 'prisma.png';
  link.href = canvas.toDataURL()
  link.click();
}
