let originalArray = [64, 34, 5, 11, 90];
let myArray = [...originalArray];
let n = myArray.length;
let i = 0;
let j = i + 1;
let minIndex = i;
let isInnerLoop = true;

function renderArray(highlightIndices = []) {
  const container = document.getElementById("arrayContainer");
  container.innerHTML = "";
  myArray.forEach((num, index) => {
    const elem = document.createElement("div");
    elem.className = "array-element";
    if (highlightIndices.includes(index)) {
      elem.classList.add("highlight");
    }
    elem.textContent = num;
    container.appendChild(elem);
  });
}

function updateExplanation(text) {
  document.getElementById("explanation").innerHTML = text.replaceAll('\n', '<br>');
}

function sortStep() {
  if (i >= n - 1) {
    updateExplanation(
      `Array ordenado! ✅\n\nResultado final: [${myArray.join(", ")}]`
    );
    renderArray();
    return;
  }

  if (isInnerLoop) {
    if (j < n) {
      let compareText = `Comparando:\n- myArray[j] = ${myArray[j]} (posição ${j})\n- myArray[min_index] = ${myArray[minIndex]} (posição ${minIndex})`;
      if (myArray[j] < myArray[minIndex]) {
        minIndex = j;
        compareText += `\n\nNovo menor encontrado!\nmin_index atualizado para ${minIndex}.`;
      }
      updateExplanation(
        `Estado Atual:\n` +
        `n = ${n}\n` +
        `i = ${i}\n` +
        `j = ${j}\n` +
        `min_index = ${minIndex}\n\n` +
        `${compareText}\n\n` +
        `Array atual: [${myArray.join(", ")}]`
      );
      renderArray([i, j, minIndex]);
      j++;
    } else {
      isInnerLoop = false;
    }
  }

  if (!isInnerLoop) {
    let minValue = myArray.splice(minIndex, 1)[0];
    myArray.splice(i, 0, minValue);
    updateExplanation(
      `Movendo o menor valor (${minValue}) para a posição ${i}.\n\n` +
      `n = ${n}\n` +
      `i = ${i}\n` +
      `j reiniciado\n\n` +
      `Novo Array: [${myArray.join(", ")}]`
    );
    i++;
    j = i + 1;
    minIndex = i;
    isInnerLoop = true;
    renderArray();
  }
}

function resetArray() {
  myArray = [...originalArray];
  n = myArray.length;
  i = 0;
  j = i + 1;
  minIndex = i;
  isInnerLoop = true;
  renderArray();
  updateExplanation("Clique em 'Próximo Passo' para começar novamente.");
}

function setArray() {
  const input = document.getElementById("arrayInput").value;
  if (!input.trim()) return;

  originalArray = input
    .split(",")
    .map((item) => item.trim())
    .map(Number)
    .filter((item) => !isNaN(item));
  myArray = [...originalArray];
  n = myArray.length;
  i = 0;
  j = i + 1;
  minIndex = i;
  isInnerLoop = true;

  renderArray();
  updateExplanation(
    `Novo array definido: [${myArray.join(", ")}]\n\nClique em 'Próximo Passo' para começar.`
  );
}

renderArray();
updateExplanation("Clique em 'Próximo Passo' para começar.");
