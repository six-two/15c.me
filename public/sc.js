const _SC = {
  'p': '{projects}',
  'me': '{site}',
  'kali': '{projects}/react_fake_kali_login/',
  'w10': '',
}

listShortcuts = () => {
  let names = Object.keys(_SC);
  names.sort();
  return names;
}

getShortcut = (name) => {
  let url = _SC[name];
  if (url) {
    url = url.replace('{projects}', 'https://projects.six-two.dev');
    url = url.replace('{github}', 'https://github.com/six-two');
    url = url.replace('{site}', 'https://six-two.dev');
    return url;
  } else {
    return null;
  }
}
