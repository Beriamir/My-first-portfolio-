const setListItemActive = list => {
  const listName = list.classList[0];
  const items = Array.from(list.children);

  items.forEach(item => {
    const nestedList = Array.from(item.children);
    let itemHasThisClasses = false;

    nestedList.forEach(item => {
      if (
        item.classList.contains('dropdown-btn') ||
        item.classList.contains('btn') ||
        item.classList.contains('wrapper') ||
        item.classList.contains('list-col') ||
        item.classList.contains('list-row')
      ) {
        itemHasThisClasses = true;
      }
    });

    if (!itemHasThisClasses) {
      item.addEventListener('click', e => {
        const activeItems = e.target.parentElement.querySelectorAll(
          `.${listName} .list-item.active`
        );
        activeItems &&
          activeItems.forEach(item => {
            if (item.parentElement.classList[0] == listName)
              item.classList.remove('active');
          });
        e.target.classList.add('active');
      });
    }
  });
};

const toggleDropdown = e => {
  const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
  const nextElementIsDropdown =
    e.target.nextElementSibling.classList.contains('dropdown-content');

  if (!nextElementIsDropdown) return;

  const content = e.target.nextElementSibling;

  e.target.setAttribute('aria-expanded', !isExpanded);
  if (!isExpanded) {
    content.classList.add('active');
    content.style.height = content.scrollHeight + 'px';
  }
  if (isExpanded) {
    content.classList.remove('active');
    content.style.height = '0';
  }
};

export { setListItemActive, toggleDropdown };
