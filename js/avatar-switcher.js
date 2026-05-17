(function () {
  var els = document.querySelectorAll('.avatar-switcher');
  if (!els.length) return;

  var list;
  try { list = JSON.parse(els[0].getAttribute('data-avatars')); } catch (e) { return; }
  if (!Array.isArray(list) || list.length < 2) return;

  var key = 'avatarIdx';
  var stored = parseInt(window.localStorage.getItem(key), 10);
  var idx = (Number.isInteger(stored) && stored >= 0 && stored < list.length)
    ? stored
    : Math.floor(Math.random() * list.length);

  function apply(i) {
    idx = i;
    for (var k = 0; k < els.length; k++) els[k].src = list[i];
    try { window.localStorage.setItem(key, String(i)); } catch (e) {}
  }

  apply(idx);

  for (var j = 0; j < els.length; j++) {
    var el = els[j];
    el.style.cursor = 'pointer';
    el.title = 'Click to switch';
    el.addEventListener('click', function () {
      apply((idx + 1) % list.length);
    });
  }

  window.addEventListener('storage', function (e) {
    if (e.key !== key) return;
    var n = parseInt(e.newValue, 10);
    if (Number.isInteger(n) && n >= 0 && n < list.length && n !== idx) {
      idx = n;
      for (var k = 0; k < els.length; k++) els[k].src = list[n];
    }
  });
})();
