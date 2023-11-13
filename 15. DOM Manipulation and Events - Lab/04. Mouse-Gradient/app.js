function attachGradientEvents() {
    const bar = document.getElementById("gradient");
    const result = document.getElementById("result");

    bar.addEventListener("mousemove", (e) => {
        let power = e.offsetX / (e.target.clientWidth - 1) * 100;
        power = Math.trunc(power);
        result.textContent = power.toFixed() + "%";
    })

    bar.addEventListener("mouseout", (e) => {
        result.textContent = ""
    })
}