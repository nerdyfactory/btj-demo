var type = "arm"
var startX
var startY

function setType() {
  if (type === this.value) return 
  $('form input[type="radio"]').each(function(){
    $(this).prop('checked', false);
  });
  $(this).prop('checked', true);
  type = this.value
}

line = null

function onDragStart(e) {
  var dom = $(`#${type} .start`)
  dom.css('display', 'block');
  dom.css('top', (e.pageY - 5) + "px");
  dom.css('left', (e.pageX - 5) + "px");
  $(`#${type} .end`).css('display', 'block');
  startX = e.pageX
  startY = e.pageY
  updateLine(`#${type} .line`, e.pageX, e.pageY, e.pageX, e.pageY);
  var pos = $('.draggable').offset();
  $(`.${type} input.start`).val((e.pageX - pos.left) + "," + (e.pageY - pos.top))
}

function onDragMove(e) {
  var dom = $(`#${type} .end`)
  dom.css('top', (e.pageY-5) + "px");
  dom.css('left', (e.pageX-5) + "px");
  updateLine(`#${type} .line`, startX, startY, e.pageX, e.pageY);
}

function onDragEnd(e) {
  var pos = $('.draggable').offset();
  $(`.${type} input.end`).val((e.pageX - pos.left) + "," + (e.pageY - pos.top))
}


interact('.draggable')
.draggable({})
.on('dragstart', onDragStart)
.on('dragmove', onDragMove)
.on('dragend', onDragEnd)

function updateLine(selector, x1, y1, x2, y2) {
  var a = x1 - x2,
      b = y1 - y2,
      c = Math.sqrt(a * a + b * b);
  var sx = (x1 + x2) / 2,
      sy = (y1 + y2) / 2;
  var x = sx - c / 2,
      y = sy;
  var alpha = Math.PI - Math.atan2(-b, a);
  
  var dom = $(selector);
  dom.css('top', y + "px");
  dom.css('left', x + "px");
  dom.css('width', c + "px");
  dom.css('-moz-transform', "rotate(" + alpha + "rad)");
  dom.css('-webkit-transform', "rotate(" + alpha + "rad)");
  dom.css('-o-transform', "rotate(" + alpha + "rad)");
  dom.css('-ms-transform', "rotate(" + alpha + "rad)");
}
