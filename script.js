/* Comparador Soluciones / Productos: se mueve solo al pulsar y arrastrar (o con el teclado) */
(function () {
  const compare = document.getElementById('compare');
  const handle  = document.getElementById('compareHandle');
  if (!compare || !handle) return;

  let pos = 50;          // posicion actual en %
  let pending = false;   // hay un frame pendiente de pintar
  let dragging = false;

  function paint() {
    pending = false;
    compare.style.setProperty('--pos', pos + '%');
    handle.setAttribute('aria-valuenow', Math.round(pos));
  }

  function setPos(value) {
    pos = Math.min(100, Math.max(0, value));
    if (!pending) {
      pending = true;
      requestAnimationFrame(paint);
    }
  }

  function posFromEvent(event) {
    const rect = compare.getBoundingClientRect();
    return ((event.clientX - rect.left) / rect.width) * 100;
  }

  function firstTouch() {
    compare.classList.add('is-touched');
  }

  // solo se mueve mientras se mantiene pulsado (raton, dedo o lapiz),
  // el arrastre sigue aunque el cursor salga de la imagen
  compare.addEventListener('pointerdown', function (event) {
    dragging = true;
    compare.classList.add('is-active');
    firstTouch();
    compare.setPointerCapture(event.pointerId);
    setPos(posFromEvent(event));
    event.preventDefault();
  });

  compare.addEventListener('pointermove', function (event) {
    if (dragging) setPos(posFromEvent(event));
  });

  function endDrag(event) {
    if (!dragging) return;
    dragging = false;
    compare.classList.remove('is-active');
    if (compare.hasPointerCapture(event.pointerId)) {
      compare.releasePointerCapture(event.pointerId);
    }
  }

  compare.addEventListener('pointerup', endDrag);
  compare.addEventListener('pointercancel', endDrag);

  // teclado
  handle.addEventListener('keydown', function (event) {
    const step = event.shiftKey ? 10 : 2;
    let handled = true;

    switch (event.key) {
      case 'ArrowLeft':  setPos(pos - step); break;
      case 'ArrowRight': setPos(pos + step); break;
      case 'Home':       setPos(0);          break;
      case 'End':        setPos(100);        break;
      default:           handled = false;
    }

    if (handled) {
      firstTouch();
      event.preventDefault();
    }
  });

  // el boton no debe robar el arrastre
  handle.addEventListener('click', function (event) { event.preventDefault(); });

  paint();
})();
