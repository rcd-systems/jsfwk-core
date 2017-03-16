class RcdTextElement extends RcdSpanElement {
    constructor(text) {
        super();
        this.textBuffer = text;
    }

    init() {
        super.init();
        return this.setText(this.textBuffer);
    }
}

class RcdParagraphElement extends RcdPElement {
    constructor(text) {
        super();
        this.textBuffer = text;
    }

    init() {
        super.init();
        return this.setText(this.textBuffer);
    }
}

class RcdTextDivElement extends RcdDivElement {
    constructor(text) {
        super();
        this.span = new RcdTextElement(text).init();
    }

    init() {
        super.init();
        return this.addChild(this.span);
    }
}

class RcdParagraphDivElement extends RcdDivElement {
    constructor(text) {
        super();
        this.p = new RcdParagraphElement(text).init();
    }

    init() {
        return this.addChild(this.p);
    }
}
