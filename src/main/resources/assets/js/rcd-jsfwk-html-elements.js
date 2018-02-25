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

class RcdFooterElement extends RcdHtmlElement {
    constructor() {
        super('footer');
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
        this.domElement.submit();
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

class RcdSelectElement extends RcdChangeableElement {
    constructor() {
        super('select');
        this.options = [];
    }

    addOption(optionText) {
        const optionElement = this.createOptionElement(optionText);
        this.options.push(optionElement);
        return this.addChild(optionElement)
    }

    addOptions(optionTexts) {
        optionTexts.forEach(optionText => this.addOption(optionText));
        return this;
    }

    createOptionElement(optionText) {
        return new RcdOptionElement(optionText).init().setValue(optionText).setText(optionText);
    }

    selectIndex(index) {
        this.domElement.selectedIndex = index;
        return this;
    }

    selectOption(optionValue) {
        const index = this.options.findIndex(option => option.getValue() === optionValue);
        return this.selectIndex(index);
    }

    getSelectedIndex() {
        return this.domElement.selectedIndex;
    }

    getSelectedValue() {
        return this.options[this.getSelectedIndex()].getValue();
    }
}

class RcdInputElement extends RcdChangeableElement {
    constructor() {
        super('input');
        this.placeholder;
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        this.domElement.placeholder = placeholder;
        return this;
    }

    click() {
        this.domElement.click();
        return this;
    }

    select() {
        this.domElement.select();
        return this;
    }
}

class RcdTextAreaElement extends RcdChangeableElement {
    constructor() {
        super('textarea');
        this.placeholder;
    }

    getValue() {
        return this.domElement.value;
    }

    setValue(value) {
        this.domElement.value = value;
        return this;
    }

    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        this.domElement.placeholder = placeholder;
        return this;
    }

    click() {
        this.domElement.click();
        return this;
    }

    select() {
        this.domElement.select();
        return this;
    }
}

class RcdSectionElement extends RcdHtmlElement {
    constructor() {
        super('section');
    }
}

class RcdArticleElement extends RcdHtmlElement {
    constructor() {
        super('article');
    }
}

class RcdH1Element extends RcdHtmlElement {
    constructor() {
        super('h1');
    }
}

class RcdH2Element extends RcdHtmlElement {
    constructor() {
        super('h2');
    }
}



