class RcdDivElement extends RcdHtmlElement {
    constructor() {
        super('div');
    }

    focus() {
        this.setAttribute('tabindex', 0);
        super.focus();
        return this;
    }
}

class RcdPElement extends RcdHtmlElement {
    constructor() {
        super('p');
    }
}

class RcdHeaderElement extends RcdHtmlElement {
    constructor() {
        super('header');
    }
}

class RcdIElement extends RcdHtmlElement {
    constructor() {
        super('i');
    }
}

class RcdImgElement extends RcdHtmlElement {
    constructor(src) {
        super('img');
        this.src = src;
    }

    init() {
        super.init();
        return this.setAttribute('src', this.src);
    }
}

class RcdSpanElement extends RcdHtmlElement {
    constructor() {
        super('span');
    }
}

class RcdMainElement extends RcdHtmlElement {
    constructor() {
        super('main');
    }
}

class RcdNavElement extends RcdHtmlElement {
    constructor() {
        super('nav');
    }
}

class RcdTableElement extends RcdHtmlElement {
    constructor() {
        super('table');
    }
}

class RcdTheadElement extends RcdHtmlElement {
    constructor() {
        super('thead');
    }
}

class RcdTbodyElement extends RcdHtmlElement {
    constructor() {
        super('tbody');
    }
}

class RcdTfootElement extends RcdHtmlElement {
    constructor() {
        super('tfoot');
    }
}

class RcdTrElement extends RcdHtmlElement {
    constructor() {
        super('tr');
    }
}

class RcdThElement extends RcdHtmlElement {
    constructor() {
        super('th');
    }
}

class RcdTdElement extends RcdHtmlElement {
    constructor() {
        super('td');
    }
}

class RcdFormElement extends RcdHtmlElement {
    constructor() {
        super('form');
    }

    submit() {
        this.getDomElement().submit();
    }
}

class RcdOptionElement extends RcdHtmlElement {
    constructor() {
        super('option');
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }
}

class RcdSelectElement extends RcdHtmlElement {
    constructor() {
        super('select');
        this.options = [];
    }

    addOptions(optionTexts) {
        optionTexts.forEach(optionText => this.addOption(optionText));
        return this;
    }

    addOption(optionText) {
        const optionElement = this.createOptionElement(optionText);
        this.options.push(optionElement);
        return this.addChild(optionElement)
    }

    createOptionElement(optionText) {
        return new RcdOptionElement(optionText).
            init().
            setValue(optionText).
            setText(optionText);
    }

    getSelectedIndex() {
        return this.domElement.selectedIndex
    }

    getValue() {
        return this.options[this.getSelectedIndex()].getValue();
    }
}

class RcdInputElement extends RcdHtmlElement {
    constructor(placeholder) {
        super('input');
        this.placeholder = placeholder
    }

    init() {
        this.domElement.placeholder = this.placeholder;
        return this;
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }

    select() {
        this.domElement.select();
        return this;
    }
}



