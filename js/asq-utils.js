function override(object, prop, replacer) { 
    var old = object[prop]; object[prop] = replacer(old);
}
function getZoom(element) {
   if (!element) return 1;
   return window.getComputedStyle(element).zoom * getZoom(element.parentElement);
}


function resizeAceEditors(){
  if(!Polymer || typeof Polymer !== 'function') return;

  var els = document.querySelectorAll('asq-fiddle-q');
  [].forEach.call(els, function(el){
    var roleEl = Polymer.dom(el.root).querySelector('asq-fiddle-q-' + el.role);
    if(!roleEl) return;

    var editors = ['html', 'js', 'css'];
    editors.forEach(function(editorId){

      override(roleEl.$[editorId].editor.renderer, "screenToTextCoordinates", function(old) {
          return function(x, y) {
              var zoom = getZoom(el);
              return old.call(this, x/zoom, y/zoom)
          }
      })
    })
  })

  els = document.querySelectorAll('asq-highlight-q');
  [].forEach.call(els, function(el){
    var roleEl = Polymer.dom(el.root).querySelector('asq-highlight-'+ el.role + '-q');
    if(!roleEl) return;

    override(roleEl.$.codeEditor.editor.renderer, "screenToTextCoordinates", function(old) {
        return function(x, y) {
            var zoom = getZoom(el);
            return old.call(this, x/zoom, y/zoom)
        }
    })
  })
}