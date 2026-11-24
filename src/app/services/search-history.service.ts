import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'ioc_recipes_search_history';
const MAX_HISTORY = 6;

@Injectable({ providedIn: 'root' })
export class SearchHistoryService {
  readonly history = signal<string[]>(this.loadFromStorage());

  addTerm(rawTerm: string): void {
    const term = rawTerm.trim();
    if (term.length < 3) {
      return;
    }

    const current = this.history();
    const lastTerm = current[0];
    if (lastTerm && lastTerm.toLowerCase() === term.toLowerCase()) {
      return;
    }

    const updated = [term, ...current.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(
      0,
      MAX_HISTORY
    );
    this.history.set(updated);
    this.saveToStorage(updated);
  }

  clearHistory(): void {
    this.history.set([]);
    this.saveToStorage([]);
  }

  private loadFromStorage(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Si localStorage falla (p. ej. cuota o bloqueo), mantenemos el estado en memoria sin romper la app.
    }
  }
}