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
    //Funcion ordenar para alinear el panel con el roof
    return x > y ? [x, y] : [y, x];
  };
  //orden incial y creacion de constantes x,y que representan el panel y variables w,z que representan el roof
  const [x, y] = ordenar(panelWidth, panelHeight);
  let [w, z] = ordenar(roofWidth, roofHeight);
  //Inciamos un bucle que no parará hasta cumplirse el if
  while (true) {
    let h = Math.trunc(w / x); //Calculo de cuantas veces cae el panel en el roof horizontalmente
    let v = Math.trunc(z / y); //Calculo de cuantas veces cae el panel en el roof verticalmente
    if (h < 1 || v < 1) {
      //Si el panel no cabe en el roof de forma vertical u horizontal el bucle termina
      break;
    }
    resultado += h * v; //se agrega al resultado el caulculo de las veces horizontales y verticales
    w -= h * x; // se recalcula el ancho del roof restandole el area que ya cubren los paneles
    [w, z] = ordenar(w, z); //Se reordena el roof restante para alinear nuevamente
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
