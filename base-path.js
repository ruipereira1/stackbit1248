/**
 * Ensures relative asset URLs resolve correctly on GitHub Pages subpaths and PWA.
 * Must load synchronously before stylesheets and other assets.
 */
(function () {
    'use strict';

    if (location.protocol === 'file:') {
        return;
    }

    var path = location.pathname || '/';

    if (path.endsWith('/index.html')) {
        path = path.slice(0, -10);
    } else if (/\.[a-zA-Z0-9]+$/.test(path)) {
        path = path.slice(0, path.lastIndexOf('/') + 1);
    }

    if (!path.endsWith('/')) {
        path += '/';
    }

    if (path === '/') {
        return;
    }

    var base = document.createElement('base');
    base.href = path;
    document.head.insertBefore(base, document.head.firstChild);
})();
