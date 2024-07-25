export default function header() {
  const buttons = document.querySelectorAll('.btn');
  const navbar = document.getElementById('navbar');
  const navbarItems = navbar.querySelectorAll('.navbar-item');
  const sidebar = document.getElementById('sidebar');
  const savedTheme = localStorage.getItem('bermir-free-nf-theme') || 'dark';
  const contentSections = document.querySelectorAll('.content-section');

  document.documentElement.setAttribute('data-theme', savedTheme);

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      //Navbar Button
      if (e.target.getAttribute('aria-controls') === 'navbar') {
        const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
        const navbarHeight = !isExpanded ? navbar.scrollHeight + 'px' : '0px';

        e.target.setAttribute('aria-expanded', !isExpanded);
        navbar.style.height = navbarHeight;
      }

      //Theme Button
      if (e.target.getAttribute('data-toggle') === 'theme') {
        const currentTheme =
          document.documentElement.getAttribute('data-theme') || 'light';
        const theme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('bermir-free-nf-theme', theme);
      }

      //Sidebar Button
      if (e.target.getAttribute('aria-controls') === 'sidebar') {
        const isExpanded = e.target.getAttribute('aria-expanded') === 'true';
        const sidebarBtns = document.querySelectorAll(
          '.btn[aria-controls="sidebar"]'
        );

        sidebarBtns.forEach(btn => {
          btn.setAttribute('aria-expanded', !isExpanded);
        });
        sidebar.classList.toggle('expanded', !isExpanded);
      }
    });
  });

  //Set to active
  navbarItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.getAttribute('id') === 'search') return;

      let targetId = e.target.getAttribute('href');

      navbarItems.forEach(item => {
        item.classList.remove('active');
      });
      e.target.classList.add('active');

      contentSections.forEach(section => {
        section.classList.remove('visible');

        if (section.getAttribute('id') === targetId) {
          section.classList.add('visible');
        }
      });
    });
  });

  window.addEventListener('resize', e => {
    if (innerWidth < 768) {
      buttons.forEach(btn => {
        if (btn.getAttribute('aria-controls') === 'navbar') {
          if (btn.getAttribute('aria-expanded') === 'true') {
            navbar.style.height = navbar.scrollHeight + 'px';
          } else {
            navbar.style.height = '0px';
          }
        }
      });
    } else if (innerWidth > 768) {
      buttons.forEach(btn => {
        if (btn.getAttribute('aria-controls') === 'navbar') {
          btn.setAttribute('aria-expanded', 'false');
          navbar.style.height = '100%';
        }
      });
    }
  });
}
