window.customElements.define('strich-liste', class Strichliste extends HTMLElement {
    // Define behavior here
    shadowRoot;

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<canvas id="slcv" width="200" height="100" style="border:1px solid #000000;"></canvas>`;

    }
    connectedCallback(){
        this.render(this.getAttribute('value'));
    }

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render(newValue);
    }

    render(wert) {

        var c = this.shadowRoot.getElementById("slcv");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        ctx.closePath();
        ctx.stroke();

        this.drawWert(ctx, wert);

    }

    getStep() {
        return 5;
    }

    getOffset(counter) {
        return (this.getStep() * counter);
    }


    drawItem(ctx, counter) {
        var canvas_width = ctx.canvas.clientWidth;
        var canvas_height = ctx.canvas.clientHeight;
        var offset = this.getOffset(counter);

        ctx.moveTo(offset, canvas_height * 0.2);
        ctx.lineTo(offset, canvas_height * 0.8);
        ctx.stroke();
    }

    drawPackage(ctx, counter) {
        var canvas_width = ctx.canvas.clientWidth;
        var canvas_height = ctx.canvas.clientHeight;
        var blockOffset = this.getOffset(counter - 5) + this.getStep();
        var offset = this.getOffset(counter);
        ctx.moveTo(blockOffset, canvas_height * 0.2);
        ctx.lineTo(offset, canvas_height * 0.8);
        ctx.stroke();
    }

    drawWert(ctx, wert) {
        let j = 0;
        for (let i = 1; i <= wert; i++) {
            this.drawItem(ctx, i + j);
            if (i != 0 && i % 5 == 0) {
                this.drawPackage(ctx, i + j);
                j++;
            }
        }
    }
});