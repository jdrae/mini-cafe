// https://github.com/roy-jung/js-vending-machine/blob/step4/src/util/dom.ts
const template = document.createElement('template')

const createElem = (elem) => {
  if (elem instanceof HTMLElement) return elem
  template.replaceChildren()
  template.insertAdjacentHTML('afterbegin', elem)
  return template.firstElementChild
}

const el = (parent, children) => {
  const parentElem = createElem(parent)
  if (children) {
    const frag = document.createDocumentFragment()
    children.forEach(elem => {
      if (elem instanceof String && !elem.startsWith('<')) frag.append(elem)
      else frag.appendChild(createElem(elem))
    })
    parentElem.replaceChildren(frag)
  }
  return parentElem
}
export default el

export const getIndex = (elem) => {
  if (!elem.parentElement) return -1
  return Array.prototype.indexOf.call(elem.parentElement.children, elem)
}

export function setVisibility(element, visible) {
  element.style.setProperty('display', visible ? 'initial' : 'none');
}

export function removeChildren(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}