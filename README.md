# App de Recetas - DA2 OA01 EAC2 / EAC3

Aplicación web desarrollada con **Angular 22** basada en componentes standalone para la gestión, filtrado combinado y visualización detallada de recetas culinarias, ampliada en la **EAC3 (RA3)** con integración a API local (`json-server`), adaptación de modelos, formularios reactivos e historial persistente.

## Requisitos del entorno
- Node.js 24.15.0 o superior (LTS)
- npm 11.x
- Angular CLI 22.x
- TypeScript 6.0.x

## Rama de trabajo
- Rama actual de trabajo (EAC3): `ra3-serveis` (partiendo de `ra2-components`)[cite: 1, 3]

## Estructura de componentes creados
- `RecipeListComponent`: Componente de lista que recorre y renderiza la colección de recetas.
- `RecipeCardComponent`: Componente de tarjeta que muestra la información resumida de cada receta.
- `RecipeTagComponent`: Subcomponente encargado de mostrar la etiqueta o badge visual de la categoría.
- `RecipeFilterComponent`: Componente de formulario con `FormsModule`, `[(ngModel)]` y validaciones para filtrar por texto y categoría.
- `AppComponent` (`src/app/app.component.ts`): Vista principal con formulario reactivo de búsqueda (`searchForm`), historial reciente, banner de error con reintento y formulario de alta (`createForm` con `POST`).

## Modelos, adaptador y servicios (RA3)
- **API local:** `db.json` servido con `json-server` en `http://localhost:3000` (recurso `/recipes` con al menos 10 elementos).
- **URL base centralizada:** `src/app/core/api.config.ts` (`API_BASE_URL = 'http://localhost:3000'`).
- **Modelos y adaptador:** `RecipeApi` (`src/app/models/recipe-api.model.ts`), `Recipe` (`src/app/models/recipe.model.ts`) y `adaptRecipeFromApi` (`src/app/adapters/recipe.adapter.ts`).
- **Servicios:** `RecipeService` (`src/app/services/recipe.service.ts`) con `HttpClient`, `GET`, `POST`, estados (`loading`, `error`, `recipes`), reintento (`retryLastQuery()`) y `switchMap`; y `SearchHistoryService` (`src/app/services/search-history.service.ts`) con `localStorage` y `try/catch`.
- **Documentación técnica:** `docs/models.md`, `docs/serveis.md` y `docs/formularis.md`.

## Comandos del proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
