document.addEventListener("DOMContentLoaded", () => {
    const monto = document.getElementById("monto");
    const propina = document.getElementById("propina");
    const personas = document.getElementById("personas");
    const resultado = document.getElementById("resultado");

    function calcular() {
        const montoTotal = parseFloat(monto.value) || 0;
        const porcentajePropina = parseFloat(propina.value) || 0;
        const numPersonas = parseInt(personas.value) || 1;

        const totalConPropina = montoTotal + (montoTotal * porcentajePropina / 100);
        const pagoPorPersona = totalConPropina / numPersonas;

        resultado.textContent = `Cada persona paga: $${pagoPorPersona.toFixed(2)}`;
    }

    // Evento en tiempo real
    monto.addEventListener("input", calcular);
    propina.addEventListener("input", calcular);
    personas.addEventListener("input", calcular);
});

// Definición de WebComponent
class ResultadoCalculadora extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <div>
                <p id="total">Total con propina: $0.00</p>
                <h3 id="porPersona">Cada persona paga: $0.00</h3>
            </div>
        `;
    }

    actualizar(total, porPersona) {
        this.shadowRoot.querySelector("#total").textContent = `Total con propina: $${total.toFixed(2)}`;
        this.shadowRoot.querySelector("#porPersona").textContent = `Cada persona paga: $${porPersona.toFixed(2)}`;
    }
}
customElements.define("resultado-calculadora", ResultadoCalculadora);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCalculadora");
    const monto = document.getElementById("monto");
    const propina = document.getElementById("propina");
    const personas = document.getElementById("personas");
    const resultadoComp = document.querySelector("resultado-calculadora");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const montoTotal = parseFloat(monto.value);
        const porcentajePropina = parseFloat(propina.value);
        const numPersonas = parseInt(personas.value);

        if (isNaN(montoTotal) || montoTotal <= 0) {
            alert("Ingrese un monto válido mayor a 0.");
            return;
        }
        if (isNaN(porcentajePropina)) {
            alert("Seleccione un porcentaje de propina.");
            return;
        }
        if (isNaN(numPersonas) || numPersonas <= 0) {
            alert("Ingrese un número de personas válido (mínimo 1).");
            return;
        }

        const totalConPropina = montoTotal + (montoTotal * porcentajePropina / 100);
        const pagoPorPersona = totalConPropina / numPersonas;

        resultadoComp.actualizar(totalConPropina, pagoPorPersona);
    });
});

