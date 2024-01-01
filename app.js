class PlaceAround {
  constructor(el, options) {
    let defaultOptions = {
      position: "outside",
      gap: null
    };

    this.options = { ...defaultOptions, ...options };
    this.position = this.options.position;
    this.gap = this.options.gap;

    this.$container = document.querySelector(el);
    this.$rotatingItem = Array.from(this.$container.querySelectorAll(".el"));
    this._angle = 360 / this.$rotatingItem.length;

    this.$rotatingItem.map((el, index) => {
      const child = el.querySelector("span");
      const angle = this._angle * (index + 1);
      const outsideOffset = this.gap + child.offsetWidth;

      if (this.position === "inside") {
        el.style.transform = `rotate(${angle}deg) translateX(${
          this.gap ? this.gap : 0
        }px)`;
      } else {
        el.style.transform = `rotate(${angle}deg) translateX(-${outsideOffset}px)`;
      }

      child.style.transform = `rotate(-${angle}deg)`;

      // Отступ нужен для того, чтобы Box модель совпадала с размером container'a + всех элементов
      this.$container.style.margin = `${outsideOffset}px`;
    });
  }
}

const a = new PlaceAround(".container", {
  position: "inside"
});
console.log(a);
