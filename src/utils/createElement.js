export default function createElement (tagName, attrs, children) {
  if (arguments.length === 1) {
    return document.createTextNode(tagName)
  }

  const el = document.createElement(tagName)

  for (let key in attrs) {
    if (key.startsWith('@')) {
      el.addEventListener(key, attrs[key])
      continue
    }

    el.setAttribute(key, attrs[key])
  }

  if (typeof children !== 'undefined') {
    children.forEach(child => {
      el.appendChild(child instanceof window.Node ? child : createElement(...child))
    })
  }

  return el
}
