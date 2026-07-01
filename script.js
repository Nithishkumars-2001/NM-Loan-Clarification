// =========================================================
// NM LOAN CLARIFICATION — shared behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Ambient floating currency symbols in hero ----
  var floatContainer = document.querySelector('.floaters');
  if (floatContainer) {
    var symbols = ['₹', '$', '€', '£', '¥'];
    var count = window.innerWidth < 600 ? 6 : 12;
    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = (Math.random() * 100) + '%';
      el.style.bottom = '-10%';
      var duration = 10 + Math.random() * 14;
      var delay = Math.random() * 10;
      el.style.animationDuration = duration + 's';
      el.style.animationDelay = delay + 's';
      el.style.fontSize = (1.2 + Math.random() * 2) + 'rem';
      floatContainer.appendChild(el);
    }
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Accordion for clarification items ----
  var questions = document.querySelectorAll('.clarify-q');
  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.clarify-item');
      var wasOpen = item.classList.contains('open');
      // close siblings within the same accordion group
      var group = item.parentElement;
      group.querySelectorAll('.clarify-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        var ans = openItem.querySelector('.clarify-a');
        ans.style.maxHeight = null;
      });
      if (!wasOpen) {
        item.classList.add('open');
        var answer = item.querySelector('.clarify-a');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Doubt / question form ----
  var forms = document.querySelectorAll('.doubt-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var textarea = form.querySelector('textarea');
      var thankyou = form.parentElement.querySelector('.thankyou-msg');
      if (!textarea.value.trim()) {
        textarea.classList.add('is-invalid');
        textarea.focus();
        return;
      }
      textarea.classList.remove('is-invalid');
      if (thankyou) {
        thankyou.classList.add('show');
      }
      form.reset();
      if (thankyou) {
        setTimeout(function () {
          thankyou.classList.remove('show');
        }, 6000);
      }
    });
  });

  // ---- Active nav link highlighting ----
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-ledger .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
