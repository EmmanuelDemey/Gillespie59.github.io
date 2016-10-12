/*function creatRect(zX, zY, zW, zH, zColor, zSVG) {
  var svgNS = "http://www.w3.org/2000/svg";
  var zRect = document.createElementNS(svgNS,"rect");
  var zId = "rect-" + Math.floor(Math.random() * (900 - 10) + 5);

  zRect.setAttributeNS(null,"x", zX);
  zRect.setAttributeNS(null,"y", zY);
  zRect.setAttributeNS(null,"width", zW);
  zRect.setAttributeNS(null,"height", zH);
  zRect.setAttributeNS(null,"fill",zColor);
  zRect.setAttributeNS(null,"id",zId);

  zSVG.appendChild(zRect);

  return(zId);
}


function creatText(zPace, zFrom, zSVG) {
  var svgNS = "http://www.w3.org/2000/svg";

  var ztext = document.createElementNS(svgNS, "text");
  ztext.setAttributeNS(null, "x", zPace * zFrom);
  ztext.setAttributeNS(null, "y", 25);
  zSVG.appendChild(ztext);
  ztext.textContent = zFrom +':00';
}

window.onload = function transf() {
  if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
    var svgNS = "http://www.w3.org/2000/svg";
    var zFrom = document.getElementById('timef');
    var zTo = document.getElementById('timeto');
    var ztFrom = document.getElementById('ttimef');
    var ztTo = document.getElementById('ttimeto');
    var zSVG = document.getElementById('mySVG');

    var zPace = 300 / 24;

    var zTMZ1 = creatRect(0, 30, '100%', 40, "#34839D", zSVG);
    var zTMZ2 = creatRect(0, 80, '100%', 40, "#47C287", zSVG);

    zFrom = zFrom.textContent.replace(':00', '');
    zTo = zTo.textContent.replace(':00', '');
    ztFrom = ztFrom.textContent.replace(':00', '');
    ztTo = ztTo.textContent.replace(':00', '');

    for (var i = 0; i <= 24; i++) {
        creatRect(zPace * i, 30, 1, 5, "#FFF", zSVG);
        if(i == zFrom) {
            var ztext = document.createElementNS(svgNS, "text");
            ztext.setAttributeNS(null, "x", zPace * zFrom);
            ztext.setAttributeNS(null, "y", 25);
            zSVG.appendChild(ztext);
            ztext.textContent = zFrom +':00';
        }

        if(i == zTo) {
            var ztext = document.createElementNS(svgNS, "text");
            ztext.setAttributeNS(null, "x", zPace * zTo);
            ztext.setAttributeNS(null, "y", 25);
            zSVG.appendChild(ztext);
            ztext.textContent = zTo +':00';
        }

        if(i == ztFrom) {
            var ztext = document.createElementNS(svgNS, "text");
            ztext.setAttributeNS(null, "x", zPace * zFrom);
            ztext.setAttributeNS(null, "y", 165);
            zSVG.appendChild(ztext);
            ztext.textContent = ztFrom +':00';
        }

        if(i == ztTo) {
            var ztext = document.createElementNS(svgNS, "text");
            ztext.setAttributeNS(null, "x", zPace * zTo);
            ztext.setAttributeNS(null, "y", 165);
            zSVG.appendChild(ztext);
            ztext.textContent = ztTo +':00';
        }

        var proot = (zTo - zFrom) * zPace;

    }

    var zRange = creatRect(zPace * zFrom, 30, proot, 120, "rgba(255,255,255,.3)", zSVG);
  }
};*/
