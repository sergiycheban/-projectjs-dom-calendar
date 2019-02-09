var DOMik = {
  //Взимане на съществуващ DOM елемент от страницата.
  getElement: function(selector) {
    return document.querySelector(selector);
  },
  //Добавяне на не съществуващ елемент към произволен елемент, вече съществуващ
  //на HTML страницата.
  addElement: function(parentIdentifier, tagChild) {
    var element = this.getElement(parentIdentifier);
    var newElement = document.createElement(tagChild);
    element.appendChild(newElement);
    return newElement;
  },
  // Изтриване на съществуващ елемент от HTML страницата.
  removeElement: function(selector) {
    var element = this.getElement(selector);
    element.parentNode.removeChild(element);
  },
  // Промяна на атрибутите на елемента (id / class / data / name)
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
  // Промяна и връщане на текстово съдържание.
  setText: function(selector, text) {
    this.getElement(selector).textContent = text;
  },
    // Bръщане на текстово съдържание.
  getText: function(selector) {
      return this.getElement(selector).textContent;
  },
  // Промяна на HTML съдържание на елемента.
  setHTMLСontent: function(selector, newContent , isAdd = false) {
    if( isAdd ){
      this.getElement(selector).innerHTML += newContent;
    }
    else{
      this.getElement(selector).innerHTML = newContent;
    }
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
  },
  // Контрол на траверсирането спрямо селектираният елемент в това число
  //  • Достъп до родител (parent element)
  //  • Достъп до роднина, над елемент (sibling element)
  //  • Достъп до роднина под елемент (sibling element)
  //  • Достъп до всички деца на елемента (children elements)
  getFamilyElement: function(selector) {
    var familyElements = {
      parent: this.getElement(selector).parentElement,
      previousSibling: this.getElement(selector).previousSibling,
      nextSibling: this.getElement(selector).nextElementSibling,
      children: this.getElement(selector).children
    };
    return familyElements;
  },
  // Имплементирайте събитиен модел който да ползва вградените в системата обекти
  // за събития.
  addEvent: function(selector, event, callback) {
    this.getElement(selector).addEventListener(event, callback);
  },

  showHTML: function() {
    return document.documentElement.outerHTML;
  }
};
