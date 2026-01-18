import * as fs from "fs";

interface TestCase {
  panelW: number;
  panelH: number;
  roofW: number;
  roofH: number;
  expected: number;
}

interface TestData {
  testCases: TestCase[];
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  let resultado = 0;
  const ordenar = (x: number, y: number) => {
    //Funcion ordenar para alinear el panel con el techo(roof)
    return x > y ? [x, y] : [y, x]; //retorna el mayor valor primero
  };
  //orden incial y creacion de constantes x,y que representan el tamaño de los paneles y variables w,z que representan el techo
  const [x, y] = ordenar(panelWidth, panelHeight);
  let [w, z] = ordenar(roofWidth, roofHeight);
  //Inciamos un bucle que no parará hasta cumplirse el if (no se pueden colocar más paneles en el techo)
  while (true) {
    let h = Math.trunc(w / x); //Calculo de cuantos paneles caben en el techo horizontalmente
    let v = Math.trunc(z / y); //Calculo de cuantos paneles caben en el techo verticalmente
    if (h < 1 || v < 1) {
      //Si ningún panel cabe en el techo de forma vertical u horizontal el bucle termina
      break;
    }
    resultado += h * v; //Se agrega al resultado el número total de paneles colocados en esta iteración, considerando las posiciones horizontales (h) y verticales (v).
    w -= h * x; // Se ajusta el ancho del techo restando el espacio ocupado por los paneles en esta iteración.
    [w, z] = ordenar(w, z); //Se reordenan las dimensiones del techo restante para asegurar que el valor mayor esté primero en la siguiente iteración.
  }
  return resultado;
}

function main(): void {
  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("================================\n");

  runTests();
}

function runTests(): void {
  const data: TestData = JSON.parse(
    fs.readFileSync("test_cases.json", "utf-8")
  );
  const testCases = data.testCases;

  console.log("Corriendo tests:");
  console.log("-------------------");

  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(
      test.panelW,
      test.panelH,
      test.roofW,
      test.roofH
    );
    const passed = result === test.expected;

    console.log(`Test ${index + 1}:`);
    console.log(
      `  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`
    );
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

main();
