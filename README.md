# 15c.me

A simple URL shortcut / redirect application that supports password protected entries.
It is designed as a static web app, that does not rely on any server side processing or databases.
Includes an GUI that allows viewing, sorting and filtering all available shortcuts.

## Create your own shortcuts

1. Create a json file with all your shortcuts and host it somewhere (or just edit `public/sc.json`).
2. Go replace all references to `15c.me/sc.json` with the URL where you host your own shortcut file.
3. Deploy your app:
    - Either run `npm run build` and upload the `build/` folder.
    - Or follow this [Github Pages guide](https://github.com/gitname/react-gh-pages).

### Encrypted shortcuts

Go to `https://15c.me/shortcuts/encrypt` (or `yourdomain.com/path/to/app` and click on the `Encrypt a link` menu item) and type in your password and the target URL.
Then copy the `Encrypted URL` value and use it as the URL in your shortcut json file.

## Advanced configuration

| Component         | File              |
| ----------------- | ----------------- |
| React app         | src/app/Config.ts |
| React app (build) | package.json      |
| Redirect page     | public/404.html   |


## Thanks to

- John Sorrentino for making the [favicon](https://favicon.io/favicon-generator/?t=15c&ff=Kanit&fs=90&fc=%23000&b=rounded&bc=%23ADF) creation fast and simple
