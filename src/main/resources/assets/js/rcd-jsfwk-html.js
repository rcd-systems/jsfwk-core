class RcdXmlElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.attributes = {};
        this.text;
        this.children = [];
    }

    clear() {
        this.text;
        this.children = [];
        return this;
    }

    setAttribute(key, value) {
        this.attributes[key] = value;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    addChild(child) {
        if (child) {
            this.children.push(child);
        }
        return this;
    }

    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
        return this;
    }
}

class RcdDomElement extends RcdXmlElement {
    constructor(name) {
        super(name);
        this.domElement = document.createElement(name);
    }

    getDomElement() {
        return this.domElement;
    }

    setAttribute(key, value) {
        super.setAttribute(key, value);
        this.domElement.setAttribute(key, value);
        return this;
    }

    setText(text) {
        super.setText(text);
        this.domElement.innerHTML = text;
        return this;
    }

    addChild(child) {
        super.addChild(child);
        if (child) {
            this.domElement.appendChild(child.getDomElement());
        }
        return this;
    }

    removeChild(child) {
        super.removeChild(child);
        this.domElement.removeChild(child.getDomElement());
        return this;
    }

    removeAllChildren() {
        const children = this.children.slice();
        children.forEach((child) => this.removeChild(child));
        return this;
    }

    clear() {
        super.clear();
        this.domElement.innerHTML = '';
    }

    setParent(parent = document.body) {
        this.removeParent(parent);
        if (parent instanceof RcdDomElement) {
            parent.addChild(this);
        } else {
            parent.appendChild(this.getDomElement());
        }
        this.parent = parent;
        return this;
    }

    removeParent() {
        if (this.parent) {
            if (this.parent instanceof RcdDomElement) {
                this.parent.removeChild(this);
            } else {
                this.parent.removeChild(this.getDomElement());
            }
        }
        this.parent = undefined;
        return this;
    }
}

class RcdHtmlElement extends RcdDomElement {
    constructor(name) {
        super(name);
        this.classes = [];
        this.eventListeners = {};
    }

    init() {
        return this;
    }

    setId(id) {
        this.setAttribute('id', id);
        return this;
    }

    hasClass(aClass) {
        return this.classes.indexOf(aClass) !== -1;
    }

    addClass(aClass) {
        if (!this.hasClass(aClass)) {
            this.classes.push(aClass);
            this.setAttribute("class", this.classes.join(' '));
        }
        return this;
    }

    removeClass(aClass) {
        const index = this.classes.indexOf(aClass);
        if (index !== -1) {
            this.classes.splice(index, 1);
            this.setAttribute("class", this.classes.join(' '));
        }
        return this;
    }

    hasEventListener(type, listener) {
        return this.eventListeners[type] && this.eventListeners[type].indexOf(listener) !== -1;
    }

    addEventListener(type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this.eventListeners[type] = this.eventListeners[type] || [];
            this.eventListeners[type].push(listener);
            this.domElement.addEventListener(type, (event) => listener(this, event));
        }
        return this;
    }

    removeEventListener(type, listener) {
        if (this.eventListeners[type]) {
            const index = this.eventListeners[type].indexOf(listener);
            if (index !== -1) {
                this.eventListeners[type].splice(index, 1);
                this.domElement.removeEventListener(type, listener);
            }
        }
        return this;
    }

    addClickListener(listener) {
        return this.addEventListener('click', listener);
    }

    removeClickListener(listener) {
        return this.removeEventListener('click', listener);
    }

    addMouseOverListener(listener) {
        return this.addEventListener('mouseover', listener);
    }

    addMouseOutListener(listener) {
        return this.addEventListener('mouseout', listener);
    }

    addChangeListener(listener) {
        return this.addEventListener('change', listener);
    }

    addKeyUpListener(key, listener) {
        return this.addEventListener('keyup', (event)=> {
            if (!key || key === event.key) {
                listener(event);
            }
        });
    }

    isSelected() {
        return this.hasClass('selected');
    }

    select(selected) {
        if (selected) {
            this.addClass('selected');
        } else {
            this.removeClass('selected');
        }
        return this;
    }

    click() {
        this.getDomElement().click();
        return this;
    }

    setTooltip(tooltip) {
        this.setAttribute('title', tooltip);
        return this;
    }

    setPosition(left, top) {
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = left + 'px';
        this.domElement.style.top = top + 'px';
        return this;
    }

    focus() {
        this.domElement.focus();
        return this;
    }

    show(show) {
        if (show) {
            this.removeClass('rcd-hidden');
        } else {
            this.addClass('rcd-hidden');
        }
    }
}