# calculatePanels

Función escrita en **TypeScript** que calcula cuántos paneles rectangulares pueden colocarse dentro de un techo rectangular, optimizando la alineación y ocupación del espacio disponible.

## ¿Qué hace esta función?

La función `calculatePanels` recibe las dimensiones de un panel y un techo, y calcula el **número máximo de paneles** que pueden colocarse dentro del techo sin superponerse, considerando su orientación. Si los paneles no caben por completo en el techo, la función sigue recalculando el espacio restante para determinar la cantidad total de paneles que se pueden colocar.

### Lógica de la función:

- Reordena las dimensiones del panel y del techo para alinear los tamaños de manera que siempre se utilicen las dimensiones más grandes.
- Calcula cuántos paneles caben horizontal y verticalmente en el espacio del techo.
- Resta el área ocupada por los paneles y repite el proceso hasta que no se pueda colocar más paneles.

## Parámetros

La función **`calculatePanels`** recibe los siguientes parámetros:

- **`panelWidth`** (número): El ancho del panel.
- **`panelHeight`** (número): El alto del panel.
- **`roofWidth`** (número): El ancho del techo.
- **`roofHeight`** (número): El alto del techo.

## Valor de Retorno

La función retorna un **número** que indica la cantidad total de paneles que pueden colocarse dentro del techo.

## Ejemplo de Uso

```typescript
const totalPanels = calculatePanels(1, 2, 3, 5);
console.log(totalPanels); // Resultado esperado: 7
```
