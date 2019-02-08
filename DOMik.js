var DOMik = {
  getElement: function(selector) {
    return document.querySelector(selector);
  },
  addElement: function(parentIdentifier, tagChild) {
    var element = this.getElement(parentIdentifier);
    var newElement = document.createElement(tagChild);
    element.appendChild(newElement);
    return newElement;
  },
  removeElement: function(selector) {
    var element = this.getElement(selector);
    element.parentNode.removeChild(element);
  },
  changeElementAttribute: function(selector, properties) {
    var element = this.getElement(selector);
    var firstChar = properties.charAt(0);
    properties = properties.slice(1);

    switch (firstChar) {
      case ".":
        element.setAttribute("class", properties);
        break;
      case "#":
        element.setAttribute("id", properties);
        break;
      case "@":
        element.setAttribute("name", properties);
        break;
      case "%":
        element.setAttribute("data", properties);
        break;
      default:
        break;
    }
  },
  elementText: function(selector, text = null) {
    if (text === null) {
      return this.getElement(selector).textContent;
    }
    this.getElement(selector).textContent = text;
  },
  HTMLСontent: function(selector, newContent = null) {
    if (newContent === null) {
      return this.getElement(selector).outerHTML;
    }
    this.getElement(selector).innerHTML = newContent;
  },
  setStyle: function(selector) {
    console.log("style");
  },
  getFamilyElement: function(selector, familyPosition) {
    var familyElements = {
      parent: this.getElement(selector).parentElement,
      previousSibling: this.getElement(selector).previousSibling,
      nextSibling: this.getElement(selector).nextElementSibling,
      children: this.getElement(selector).children
    };
    return familyElements;
  },

  showHTML: function() {
    return document.documentElement.outerHTML;
  }
};
