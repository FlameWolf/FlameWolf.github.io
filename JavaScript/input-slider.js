"use strict";
customElements.define("input-slider", class extends HTMLElement {
	constructor() {
		super();
		Object.defineProperties(this, {
			"label": {
				"value": document.createElement("label"),
				"enumerable": true
			},
			"input": {
				"value": document.createElement("input"),
				"enumerable": true
			},
			"outputHolder": {
				"value": document.createElement("span"),
				"enumerable": true
			},
			"button": {
				"value": document.createElement("button"),
				"enumerable": true
			},
			"valueSuffix": {
				"value": new String(),
				"writable": true,
				"enumerable": true
			},
			"dirty": {
				"value": false,
				"writable": true,
				"enumerable": true
			},
			"position": {
				set(value) {
					this.input.value = value;
					this.input.dispatchEvent(new Event("input"));
				},
				get() {
					return this.input.value;
				},
				"enumerable": true
			}
		});
		Object.seal(this);
		Object.freeze(this.__proto__);
		this.outputHolder.style.float = "right";
		this.button.style.float = "right";
		this.attachShadow({ "mode": "open" });
	}
	reset() {
		this.dirty = false;
		this.position = this.getAttribute("default");
	}
	static get observedAttributes() {
		return [ "text", "name", "min", "max", "default", "value-suffix" ];
	}
	attributeChangedCallback(attrName, oldValue, newValue) {
		switch(attrName) {
			case "text":
				this.label.textContent = newValue;
				break;
			case "name":
				this.label.setAttribute("for", newValue);
				this.input.setAttribute("id", newValue);
				break;
			case "min":
				this.input.setAttribute("min", newValue);
				break;
			case "max":
				this.input.setAttribute("max", newValue);
				break;
			case "default":
				if(!this.dirty)
					this.position = newValue;
				break;
			case "value-suffix":
				this.valueSuffix = newValue;
				break;
			default:
				break;
		}
	}
	connectedCallback() {
		if(this.isConnected) {
			let container = document.createElement("p");
			this.label.setAttribute("for", this.getAttribute("name"));
			this.label.textContent = this.getAttribute("text");
			this.input.setAttribute("name", this.getAttribute("name"));
			this.input.setAttribute("type", "range");
			this.input.setAttribute("min", this.getAttribute("min"));
			this.input.setAttribute("max", this.getAttribute("max"));
			this.input.addEventListener("input", (function(event) {
				this.outputHolder.textContent = (this.input.value + this.valueSuffix);
				this.dispatchEvent(new CustomEvent("update", { "detail": { "position": this.position } }));
			}).bind(this));
			this.input.addEventListener("change", (function(event) {
				this.dirty = true;
			}).bind(this));
			this.position = this.getAttribute("default");
			this.button.textContent = "Reset";
			this.button.addEventListener("click", (function(event) {
				this.reset();
			}).bind(this));
			container.appendChild(this.label);
			container.appendChild(this.outputHolder);
			container.appendChild(document.createElement("br"));
			container.appendChild(this.input);
			container.appendChild(this.button);
			this.shadowRoot.appendChild(container);
			container = null;
		}
	}
});