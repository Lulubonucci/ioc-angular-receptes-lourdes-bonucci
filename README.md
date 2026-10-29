# App de Recetas - DA2 OA01 EAC2

Aplicación web desarrollada con **Angular 22** basada en componentes standalone para la gestión, filtrado combinado y visualización detallada de recetas culinarias.

## Requisitos del entorno
* Node.js 24.15.0 o superior (LTS)
* npm 11.x
* Angular CLI 22.x
* TypeScript 6.0.x

## Rama de trabajo
* `ra2-components`

## Estructura de componentes creados
* `RecipeListComponent`: Componente de lista que recorre y renderiza la colección de recetas.
* `RecipeCardComponent`: Componente de tarjeta que muestra la información resumida de cada receta.
* `RecipeTagComponent`: Subcomponente encargado de mostrar la etiqueta o badge visual de la categoría.
* `RecipeFilterComponent`: Componente de formulario con `FormsModule`, `[(ngModel)]` y validaciones para filtrar por texto y categoría.

## Comandos del proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
