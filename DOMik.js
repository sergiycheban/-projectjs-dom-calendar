var DOMik = {
  //Взимане на съществуващ DOM елемент от страницата.
  getElement: function(selector) {
    return document.querySelector(selector);
  },
  //Добавяне на не съществуващ елемент към произволен елемент, вече съществуващ
  //на HTML страницата.
  addElement: function(parentIdentifier, tagChild, id = null) {
    var element = this.getElement(parentIdentifier);
    var newElement = document.createElement(tagChild);
    element.appendChild(newElement);
    if (id !== null) {
      newElement.setAttribute("id", id);
    }
    return newElement;
  },
  // Изтриване на съществуващ елемент от HTML страницата.
  removeElement: function(selector) {
    var element = this.getElement(selector);
    element.remove();
    return this;
  },
  // Промяна на атрибутите на елемента (id / class / data / name)
  changeElementAttribute: function(selector, attributes) {
    for (var key in attributes) {
      this.getElement(selector).setAttribute(key, attributes[key]);
    }
    return this;
  },
  // Промяна и връщане на текстово съдържание.
  setText: function(selector, text) {
    this.getElement(selector).textContent = text;
    return this;
  },
  // Bръщане на текстово съдържание.
  getText: function(selector) {
    return this.getElement(selector).textContent;
  },
  // Промяна на HTML съдържание на елемента.
  setHTMLСontent: function(selector, newContent, isAdd = false) {
    if (isAdd) {
      this.getElement(selector).innerHTML += newContent;
    } else {
      this.getElement(selector).innerHTML = newContent;
    }
    return this;
  },
  // Bръщане на HTML съдържание на елемента.
  getHTMLСontent: function(selector) {
    return this.getElement(selector).outerHTML;
  },
  // Промяна на съществуващи стилове, както и добавяне на множество стилове
  // под формата на обект.
  setStyle: function(selector, samplingFromStyles) {
    for (var key in samplingFromStyles) {
      this.getElement(selector).style.setProperty(key, samplingFromStyles[key]);
    }
    return this;
  },
  // Контрол на траверсирането спрямо селектираният елемент в това число
  //  • Достъп до родител (parent element)
  getParentElement: function(selector) {
    return this.getElement(selector).parentElement;
  },

  //  • Достъп до роднина, над елемент (sibling element)
  getPreviousSiblingElement: function(selector) {
    return this.getElement(selector).previousSibling;
  },

  //  • Достъп до роднина под елемент (sibling element)
  getnNxtElementSibling: function(selector) {
    return this.getElement(selector).nextElementSibling;
  },

  //  • Достъп до всички деца на елемента (children elements)
  getChildren: function(selector) {
    return this.getElement(selector).children;
  },
  // Имплементирайте събитиен модел който да ползва вградените в системата обекти
  // за събития.
  addEvent: function(selector, event, callback) {
    this.getElement(selector).addEventListener(event, callback);
    return this;
  },

  showHTML: function() {
    return document.documentElement.outerHTML;
  }
};
