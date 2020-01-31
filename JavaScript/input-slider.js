"use strict";
(function() {
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
				"position": {
					set(value) {
						this.input.value = value;
						this.input.dispatchEvent(new Event("input"));
					},
					get() {
						return this.input.value;
					},
					"enumerable": true
				},
				"unit": {
					"value": "",
					"writable": true,
					"enumerable": true
				},
				"value": {
					get() {
						return `${this.position}${this.unit}`;
					}
				},
				"dirty": {
					"value": false,
					"writable": true,
					"enumerable": true
				}
			});
			Object.seal(this);
			Object.freeze(Object.getPrototypeOf(this));
			this.outputHolder.style.float = "right";
			this.button.style.float = "right";
		}
		reset() {
			this.dirty = false;
			this.position = this.getAttribute("default");
		}
		static get observedAttributes() {
			return [ "text", "name", "min", "max", "default", "unit" ];
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
				case "unit":
					this.outputHolder.textContent = this.value;
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
				this.input.setAttribute("type", "range");
				this.input.setAttribute("min", this.getAttribute("min"));
				this.input.setAttribute("max", this.getAttribute("max"));
				this.input.addEventListener("input", (function(event) {
					this.outputHolder.textContent = this.value;
					this.dispatchEvent(new CustomEvent("update", {
						"detail": {
							"value": this.value
						},
						"bubbles": true
					}));
				}).bind(this));
				this.input.addEventListener("change", (function(event) {
					this.dirty = true;
				}).bind(this));
				this.unit = this.getAttribute("unit");
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
				this.appendChild(container);
				container = null;
			}
		}
	});
})();