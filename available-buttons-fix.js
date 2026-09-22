(function () {
  function hasClass(el, name) {
    return el && (' ' + el.className + ' ').indexOf(' ' + name + ' ') !== -1;
  }

  function closestWithClass(el, name) {
    while (el && el !== document) {
      if (hasClass(el, name)) return el;
      el = el.parentNode;
    }
    return null;
  }

  function openProductFromAvailable(target) {
    var badge = closestWithClass(target, 'product-available');
    if (!badge) return false;

    var card = closestWithClass(badge, 'store-card');
    if (!card) return true;

    var details = card.querySelector ? card.querySelector('.store-details') : null;
    var extra = card.querySelector ? card.querySelector('.extra-product-pictures') : null;

    if (details) details.hidden = false;
    if (extra) extra.hidden = false;

    if (badge.setAttribute) {
      badge.setAttribute('aria-expanded', 'true');
      badge.setAttribute('role', 'button');
      badge.setAttribute('tabindex', '0');
    }
    if (badge.style) badge.style.cursor = 'pointer';

    return true;
  }

  function goToStore(target) {
    var link = closestWithClass(target, 'physical-item-link');
    if (!link) return false;

    var href = link.getAttribute ? link.getAttribute('href') : '';
    if (href === '#store') {
      var store = document.getElementById('store');
      if (store && store.scrollIntoView) store.scrollIntoView();
      return true;
    }
    return false;
  }

  function prepareAvailableLabels() {
    var badges = document.querySelectorAll ? document.querySelectorAll('.product-available') : [];
    var i;
    for (i = 0; i < badges.length; i++) {
      if (badges[i].style) badges[i].style.cursor = 'pointer';
      if (badges[i].setAttribute) {
        badges[i].setAttribute('role', 'button');
        badges[i].setAttribute('tabindex', '0');
        badges[i].setAttribute('aria-expanded', 'false');
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', function (event) {
      var target = event.target || event.srcElement;
      if (openProductFromAvailable(target)) return;
      goToStore(target);
    }, true);

    document.addEventListener('keydown', function (event) {
      event = event || window.event;
      var key = event.key || event.keyCode;
      if (key === 'Enter' || key === ' ' || key === 13 || key === 32) {
        if (openProductFromAvailable(event.target || event.srcElement)) {
          if (event.preventDefault) event.preventDefault();
          event.returnValue = false;
        }
      }
    }, true);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', prepareAvailableLabels, false);
    } else {
      prepareAvailableLabels();
    }
  }
})();