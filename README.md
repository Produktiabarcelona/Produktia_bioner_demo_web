# Demo web — Soluciones y Productos

Landing de una sola página con un comparador de imágenes tipo *slider*.

## Contenido

- `index.html` — estructura de la página (barra superior, titular y comparador)
- `styles.css` — estilos y diseño responsive; `IMGFondo.png` como fondo
- `script.js` — lógica del comparador

## El comparador

- `IMG1.jpg` = **Soluciones** (izquierda) · `IMG2.jpg` = **Productos** (derecha)
- Se mueve **solo al pulsar y arrastrar** (ratón, dedo o lápiz)
- Accesible con teclado: flechas ←/→ (2%), Shift + flechas (10%), Inicio/Fin

## Verlo en local

```bash
python -m http.server 5173
```

Y abrir http://localhost:5173

## Publicación

Desplegado con GitHub Pages desde la rama `main`.
