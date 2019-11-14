"use strict";
customElements.define("input-slider", class extends HTMLElement {
	constructor() {
		super();
		this.label = document.createElement("label");
		this.input = document.createElement("input");
		this.outputHolder = document.createElement("span");
		this.outputHolder.style.float = "right";
		this.button = document.createElement("button");
		this.button.style.float = "right";
		this.valueSuffix = new String();
		this.dirty = false;
	}
	set position(value) {
		this.input.value = value;
		this.input.dispatchEvent(new Event("input"));
	}
	get position() {
		return this.input.value;
	}
	reset() {
		this.dirty = false;
		this.position = this.getAttribute("default");
	}
	static get observedAttributes() {
		return [ "text", "id", "min", "max", "default", "value-suffix" ];
	}
	attributeChangedCallback(attrName, oldValue, newValue) {
		switch(attrName) {
			case "text":
				this.label.textContent = newValue;
				break;
			case "id":
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
			let shadow = this.attachShadow({ "mode": "open" });
			let container = document.createElement("p");
			this.label.setAttribute("for", this.getAttribute("id"));
			this.label.textContent = this.getAttribute("text");
			this.input.setAttribute("id", this.getAttribute("id"));
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
			shadow.appendChild(container);
			container = null
			shadow = null;
		}
	}
});