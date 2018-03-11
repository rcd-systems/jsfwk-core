class RcdXmlElement  extends RcdObject {
    constructor(tagName) {
        super();
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

    addChildren(children) {
        if (children) {
            children.forEach(child => this.addChild(child));
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

    removeAllChildren() {
        const children = this.children.slice();
        children.forEach((child) => this.removeChild(child));
        return this;
    }
}