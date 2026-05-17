(function () {
  var btns = document.querySelectorAll('.posts-filter-btn');
  var cards = document.querySelectorAll('.post-card');
  var groups = document.querySelectorAll('.posts-year-group');
  var input = document.getElementById('posts-search-input');
  var empty = document.querySelector('.posts-empty');
  if (!btns.length && !input) return;

  var currentLang = 'all';
  var currentQuery = '';

  var index = Array.prototype.map.call(cards, function (card) {
    var title = (card.querySelector('.post-card-title') || {}).textContent || '';
    var desc = (card.querySelector('.post-card-desc') || {}).textContent || '';
    var tags = card.getAttribute('data-tags') || '';
    return {
      card: card,
      lang: card.getAttribute('data-lang') || '',
      hay: (title + ' ' + desc + ' ' + tags).toLowerCase()
    };
  });

  function apply() {
    var q = currentQuery.trim().toLowerCase();
    var visible = 0;
    index.forEach(function (item) {
      var matchLang = currentLang === 'all' || item.lang === currentLang;
      var matchQ = !q || item.hay.indexOf(q) !== -1;
      var show = matchLang && matchQ;
      item.card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    groups.forEach(function (group) {
      var n = group.querySelectorAll('.post-card:not(.is-hidden)').length;
      group.classList.toggle('is-empty', n === 0);
    });
    btns.forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === currentLang);
    });
    if (empty) empty.hidden = visible !== 0;
  }

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentLang = btn.getAttribute('data-lang');
      apply();
    });
  });

  if (input) {
    input.addEventListener('input', function () {
      currentQuery = input.value;
      apply();
    });
  }
})();
